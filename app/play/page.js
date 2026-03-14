"use client";
import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Globe, RefreshCw, Copy, Check, Share2, History } from 'lucide-react';
import { useGameContext } from '../components/GameContext';

function PlayGame() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme, soundEnabled, stats, setStats, timerEnabled, timeSettings, botLevel, playSound } = useGameContext();

  const mode = searchParams.get('mode') || 'offline';
  const joinId = searchParams.get('id') || null;

  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState(null);
  const [moveFrom, setMoveFrom] = useState(null);
  const [optionSquares, setOptionSquares] = useState({});
  const [captured, setCaptured] = useState({ w: [], b: [] });
  const [showHistory, setShowHistory] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);
  const [pendingMove, setPendingMove] = useState(null);
  const [timers, setTimers] = useState({ w: timeSettings, b: timeSettings });
  const [gameStarted, setGameStarted] = useState(false);

  // Online state
  const [peerId, setPeerId] = useState(null);
  const [conn, setConn] = useState(null);
  const [status, setStatus] = useState('idle');
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [onlineColor, setOnlineColor] = useState('w');
  const [isHost, setIsHost] = useState(false);

  const peerRef = useRef(null);
  const timerRef = useRef(null);
  const connRef = useRef(null);

  // Keep connRef in sync
  useEffect(() => { connRef.current = conn; }, [conn]);

  // AI piece values
  const pieceValues = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };

  const evaluateBoard = useCallback((chess) => {
    const board = chess.board();
    let score = 0;
    const centerSquares = [[3, 3], [3, 4], [4, 3], [4, 4]];
    const extendedCenter = [[2, 2], [2, 3], [2, 4], [2, 5], [3, 2], [3, 5], [4, 2], [4, 5], [5, 2], [5, 3], [5, 4], [5, 5]];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (!piece) continue;
        const val = pieceValues[piece.type] || 0;
        const sign = piece.color === 'b' ? 1 : -1;
        score += sign * val;
        if (centerSquares.some(([cr, cc]) => cr === r && cc === c)) score += sign * 30;
        else if (extendedCenter.some(([cr, cc]) => cr === r && cc === c)) score += sign * 10;
      }
    }
    if (chess.isCheckmate()) score += chess.turn() === 'b' ? -99999 : 99999;
    if (chess.isDraw()) score = 0;
    return score;
  }, []);

  const minimax = useCallback((chess, depth, alpha, beta, isMaximizing) => {
    if (depth === 0 || chess.isGameOver()) return evaluateBoard(chess);
    const moves = chess.moves({ verbose: true });
    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of moves) {
        chess.move(move);
        const eval_ = minimax(chess, depth - 1, alpha, beta, false);
        chess.undo();
        maxEval = Math.max(maxEval, eval_);
        alpha = Math.max(alpha, eval_);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        chess.move(move);
        const eval_ = minimax(chess, depth - 1, alpha, beta, true);
        chess.undo();
        minEval = Math.min(minEval, eval_);
        beta = Math.min(beta, eval_);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }, [evaluateBoard]);

  // Execute move
  const executeMove = useCallback((moveObj) => {
    setGame(g => {
      const copy = new Chess(g.fen());
      const result = copy.move(moveObj);
      if (result) {
        // Update captured
        const history = copy.history({ verbose: true });
        const w = [], b = [];
        history.forEach(m => {
          if (m.captured) m.color === 'w' ? b.push(m.captured) : w.push(m.captured);
        });
        setCaptured({ w, b });

        // Check game over
        if (copy.isGameOver()) {
          if (copy.isCheckmate()) {
            const res = copy.turn() === 'w' ? 'Black Wins' : 'White Wins';
            setWinner(res);
            if (mode === 'ai') {
              setStats(prev => ({
                ...prev,
                wins: res === 'White Wins' ? prev.wins + 1 : prev.wins,
                losses: res === 'Black Wins' ? prev.losses + 1 : prev.losses,
              }));
            }
          } else if (copy.isDraw()) {
            setWinner('Draw');
            if (mode === 'ai') setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
          } else {
            setWinner('Game Over');
          }
        }

        if (mode === 'online' && connRef.current) connRef.current.send({ type: 'move', move: moveObj });
        playSound(result.captured ? 'capture' : 'move');
        if (copy.inCheck()) playSound('check');
        setGameStarted(true);
      }
      return copy;
    });
  }, [mode, playSound, setStats]);

  // AI move
  const makeAiMove = useCallback(() => {
    setGame(currentGame => {
      const moves = currentGame.moves({ verbose: true });
      if (moves.length === 0) return currentGame;
      let move;
      if (botLevel === 1) {
        move = moves[Math.floor(Math.random() * moves.length)];
      } else if (botLevel === 2) {
        move = moves.find(m => m.flags.includes('c') || m.flags.includes('e'));
        if (!move) move = moves[Math.floor(Math.random() * moves.length)];
      } else {
        const copy = new Chess(currentGame.fen());
        let bestMove = moves[0];
        let bestValue = -Infinity;
        for (const m of moves) {
          copy.move(m);
          const val = minimax(copy, 2, -Infinity, Infinity, false);
          copy.undo();
          if (val > bestValue) { bestValue = val; bestMove = m; }
        }
        move = bestMove;
      }

      const copy = new Chess(currentGame.fen());
      const result = copy.move({ from: move.from, to: move.to, promotion: 'q' });
      if (result) {
        const history = copy.history({ verbose: true });
        const w = [], b = [];
        history.forEach(m => {
          if (m.captured) m.color === 'w' ? b.push(m.captured) : w.push(m.captured);
        });
        setCaptured({ w, b });

        if (copy.isGameOver()) {
          if (copy.isCheckmate()) {
            const res = copy.turn() === 'w' ? 'Black Wins' : 'White Wins';
            setWinner(res);
            setStats(prev => ({
              ...prev,
              wins: res === 'White Wins' ? prev.wins + 1 : prev.wins,
              losses: res === 'Black Wins' ? prev.losses + 1 : prev.losses,
            }));
          } else if (copy.isDraw()) {
            setWinner('Draw');
            setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
          } else {
            setWinner('Game Over');
          }
        }

        playSound(result.captured ? 'capture' : 'move');
        if (copy.inCheck()) playSound('check');
        setGameStarted(true);
      }
      return copy;
    });
  }, [botLevel, minimax, playSound, setStats]);

  // AI auto-move
  useEffect(() => {
    if (mode === 'ai' && game.turn() === 'b' && !winner && !showPromotion) {
      const timeout = setTimeout(makeAiMove, botLevel === 1 ? 400 : 800);
      return () => clearTimeout(timeout);
    }
  }, [game, mode, winner, showPromotion, botLevel, makeAiMove]);

  // Timer
  useEffect(() => {
    if (timerEnabled && gameStarted && !winner) {
      timerRef.current = setInterval(() => {
        setTimers(prev => {
          const turn = game.turn();
          if (prev[turn] <= 0) {
            setWinner(turn === 'w' ? 'Black (Time)' : 'White (Time)');
            clearInterval(timerRef.current);
            return prev;
          }
          return { ...prev, [turn]: prev[turn] - 1 };
        });
      }, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [game, gameStarted, winner, timerEnabled]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // Online PeerJS
  const setupConn = useCallback((c) => {
    setConn(c);
    c.on('data', (d) => {
      if (d.type === 'start') { setOnlineColor(d.color); setStatus('playing'); setGame(new Chess()); }
      if (d.type === 'move') executeMove(d.move);
      if (d.type === 'reset') resetBoard();
    });
    c.on('open', () => setStatus('playing'));
  }, [executeMove]);

  async function initPeer(remoteId = null) {
    setStatus('connecting');
    const { default: Peer } = await import('peerjs');
    const peer = new Peer(null, {
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' }
        ]
      }
    });
    peerRef.current = peer;

    peer.on('open', (id) => {
      setPeerId(id);
      if (!remoteId) {
        setIsHost(true);
        setInviteLink(`${window.location.origin}/play?mode=online&id=${id}`);
        setStatus('waiting');
      } else {
        setIsHost(false);
        const c = peer.connect(remoteId);
        c.on('open', () => { setupConn(c); });
      }
    });

    peer.on('connection', (c) => {
      c.on('open', () => {
        setupConn(c);
        setTimeout(() => {
          c.send({ type: 'start', color: 'b' });
          setStatus('playing');
        }, 500);
      });
    });

    peer.on('error', (err) => {
      console.error("Peer Error:", err);
      setStatus('idle');
      alert("Connection failed. Try again.");
    });
  }

  // Init online on mount
  useEffect(() => {
    if (mode === 'online') {
      initPeer(joinId);
    }
    return () => { if (peerRef.current) peerRef.current.destroy(); };
  }, []);

  function resetBoard() {
    setGame(new Chess());
    setWinner(null);
    setCaptured({ w: [], b: [] });
    setTimers({ w: timeSettings, b: timeSettings });
    setGameStarted(false);
    setShowPromotion(false);
    if (mode === 'online' && connRef.current) connRef.current.send({ type: 'reset' });
  }

  // Move handling
  function getMoveOptions(square) {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) return false;
    const newSquares = {};
    moves.forEach((m) => {
      newSquares[m.to] = {
        background: theme === 'modern' ? "radial-gradient(circle, rgba(150, 150, 150, 0.5) 20%, transparent 25%)" : "radial-gradient(circle, rgba(0,0,0,0.2) 20%, transparent 25%)",
        borderRadius: "50%"
      };
    });
    newSquares[square] = { background: "rgba(255, 255, 255, 0.2)" };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square) {
    if (winner || (mode === 'online' && game.turn() !== onlineColor) || (mode === 'ai' && game.turn() === 'b')) return;
    if (!moveFrom) {
      if (getMoveOptions(square)) setMoveFrom(square);
      return;
    }
    const moves = game.moves({ verbose: true });
    const isPromo = moves.some(m => m.from === moveFrom && m.to === square && m.flags.includes('p'));
    if (isPromo) {
      setPendingMove({ from: moveFrom, to: square });
      setShowPromotion(true);
      setOptionSquares({});
      return;
    }
    try {
      const move = game.move({ from: moveFrom, to: square, promotion: 'q' });
      game.undo();
      if (move) {
        executeMove({ from: moveFrom, to: square, promotion: 'q' });
        setMoveFrom(null);
        setOptionSquares({});
      } else {
        if (getMoveOptions(square)) setMoveFrom(square);
        else { setMoveFrom(null); setOptionSquares({}); }
      }
    } catch { setMoveFrom(null); setOptionSquares({}); }
  }

  function handlePromotion(pieceChar) {
    if (pendingMove) {
      executeMove({ ...pendingMove, promotion: pieceChar });
      setShowPromotion(false);
      setPendingMove(null);
      setMoveFrom(null);
    }
  }

  const copyLink = () => { navigator.clipboard.writeText(inviteLink); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const shareLink = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Lazy Chess', text: 'Play chess with me!', url: inviteLink }); } catch (e) { if (e.name !== 'AbortError') console.warn('Share failed:', e); }
    } else { copyLink(); }
  };

  const getIcon = (p) => {
    const symbols = { p: '\u265F', n: '\u265E', b: '\u265D', r: '\u265C', q: '\u265B', k: '\u265A' };
    const sym = symbols[p];
    if (!sym) return null;
    return <svg width="18" height="18" viewBox="0 0 18 18"><text x="9" y="14" textAnchor="middle" fontSize="14" fill="currentColor">{sym}</text></svg>;
  };

  return (
    <>
      {mode === 'online' && status === 'waiting' && (
        <div className="card">
          <Globe size={28} style={{ color: 'var(--accent-light)', margin: '0 auto 8px', display: 'block' }} />
          <h3 style={{ margin: '0 0 4px 0' }}>Waiting for Opponent</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>Share this link with your friend</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', wordBreak: 'break-all', background: 'var(--input-bg)', padding: '10px', borderRadius: '8px', margin: '0 0 10px 0', fontFamily: 'monospace' }}>{inviteLink || 'Generating...'}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn" style={{ flex: 1 }} onClick={copyLink}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy Link'}</button>
            <button className="btn btn-secondary" style={{ flex: 0, padding: '14px 16px' }} onClick={shareLink}><Share2 size={16} /></button>
          </div>
        </div>
      )}

      {mode === 'online' && (status === 'connecting' || status === 'idle') && (
        <div className="card" style={{ textAlign: 'center' }}>
          <Globe size={28} style={{ color: 'var(--accent-light)', margin: '0 auto 8px', display: 'block' }} />
          <h3 style={{ margin: '0 0 4px 0' }}>Connecting...</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Setting up peer-to-peer connection</p>
        </div>
      )}

      {(mode !== 'online' || status === 'playing') && (
        <>
          <div style={{ width: '100%', maxWidth: '450px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>{mode === 'ai' ? `Bot (Level ${botLevel} — ${['', 'Easy', 'Medium', 'Hard'][botLevel]})` : 'Opponent'}</span>
            {timerEnabled && <span>{formatTime(game.turn() === 'w' ? timers.b : timers.w)}</span>}
          </div>
          <div className="captured-row">{captured.w.map((p, i) => <span key={i} className="piece-symbol" style={{ color: 'var(--text-main)' }}>{getIcon(p)}</span>)}</div>

          <div className="board-wrap">
            <Chessboard
              position={game.fen()}
              onSquareClick={onSquareClick}
              customSquareStyles={optionSquares}
              boardOrientation={mode === 'online' && onlineColor === 'b' ? 'black' : 'white'}
              customDarkSquareStyle={{ backgroundColor: theme === 'modern' ? '#4b5563' : '#b58863' }}
              customLightSquareStyle={{ backgroundColor: theme === 'modern' ? '#d1d5db' : '#f0d9b5' }}
              animationDuration={300}
            />
            {showPromotion && (
              <div className="promo-modal">
                <div className="promo-grid">
                  {['q', 'n', 'r', 'b'].map(p => (
                    <button key={p} className="promo-btn" onClick={() => handlePromotion(p)}>
                      <svg width="28" height="28" viewBox="0 0 28 28"><text x="14" y="22" textAnchor="middle" fontSize="22" fill="#fff">{{ q: '\u265B', n: '\u265E', r: '\u265C', b: '\u265D' }[p]}</text></svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="captured-row">{captured.b.map((p, i) => <span key={i} className="piece-symbol" style={{ color: 'var(--accent-light)' }}>{getIcon(p)}</span>)}</div>
          <div style={{ width: '100%', maxWidth: '450px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>You</span>
            {timerEnabled && <span style={{ color: timers[game.turn()] < 30 ? '#f87171' : 'var(--text-main)' }}>{formatTime(game.turn() === 'w' ? timers.w : timers.b)}</span>}
          </div>

          <div className="card" style={{ padding: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="btn-secondary" style={{ width: 'auto', borderRadius: '50%', padding: '10px', background: 'var(--btn-secondary-bg)', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }} onClick={resetBoard}><RefreshCw size={18} /></button>
            <button className="btn-secondary" style={{ width: 'auto', borderRadius: '50%', padding: '10px', background: showHistory ? 'var(--accent)' : 'var(--btn-secondary-bg)', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }} onClick={() => setShowHistory(!showHistory)}><History size={18} /></button>
            <div style={{ flex: 1, fontWeight: 'bold' }}>{winner ? 'Game Over' : `${game.turn() === 'w' ? 'White' : 'Black'} to Move`}</div>
          </div>

          {showHistory && (
            <div className="card" style={{ textAlign: 'left', maxHeight: '150px', overflowY: 'auto', fontSize: '0.8rem', fontFamily: 'monospace' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}><span>PGN</span><Copy size={14} onClick={() => navigator.clipboard.writeText(game.pgn())} style={{ cursor: 'pointer' }} /></div>
              {game.pgn() || '...'}
            </div>
          )}
        </>
      )}

      {winner && (
        <div className="modal-overlay">
          <div className="card" style={{ maxWidth: '300px', border: '1px solid var(--accent-light)' }}>
            <svg width="50" height="50" viewBox="0 0 50 50" style={{ margin: '0 auto 10px', display: 'block' }}>
              <path d="M15 8h20v4h6v10c0 4-3 7-7 7h-1c-1 4-4 7-8 8v5h6v4H19v-4h6v-5c-4-1-7-4-8-8h-1c-4 0-7-3-7-7V12h6V8z" fill="var(--accent-light)" opacity="0.9" />
            </svg>
            <h2 style={{ color: 'var(--text-main)' }}>{winner}</h2>
            <button className="btn" onClick={resetBoard}><RefreshCw size={16} /> New Game</button>
            <button className="btn btn-secondary" onClick={() => router.push('/')}>Back to Menu</button>
          </div>
        </div>
      )}
    </>
  );
}

export default function PlayPage() {
  return (
    <Suspense fallback={<div className="card" style={{ textAlign: 'center' }}>Loading game...</div>}>
      <PlayGame />
    </Suspense>
  );
}
