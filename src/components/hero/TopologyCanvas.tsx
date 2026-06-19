import { useEffect, useRef } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

const TOPOLOGY_NODES = [
  { id: 'api', label: 'APIs', color: '#6366f1' },
  { id: 'postgres', label: 'PostgreSQL', color: '#10b981' },
  { id: 'airflow', label: 'Airflow', color: '#f59e0b' },
  { id: 'dbt', label: 'dbt', color: '#00d4ff' },
  { id: 'snowflake', label: 'Snowflake', color: '#8b5cf6' },
  { id: 'powerbi', label: 'Power BI', color: '#ef4444' },
  { id: 'react', label: 'React', color: '#38bdf8' },
  { id: 'nodejs', label: 'Node.js', color: '#22c55e' },
  { id: 'python', label: 'Python', color: '#facc15' },
  { id: 'docker', label: 'Docker', color: '#0ea5e9' },
];

const CONNECTIONS = [
  [0, 1], [0, 2], [1, 2], [2, 3], [2, 8],
  [3, 4], [4, 5], [6, 7], [7, 1], [8, 2],
  [8, 3], [9, 2], [9, 7], [6, 0], [5, 6],
];

export default function TopologyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const packetsRef = useRef<Packet[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNodes();
    };

    const initNodes = () => {
      const W = canvas.width;
      const H = canvas.height;
      nodesRef.current = TOPOLOGY_NODES.map((n, i) => {
        const cols = 5;
        const rows = 2;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const marginX = W * 0.12;
        const marginY = H * 0.2;
        const spacingX = (W - marginX * 2) / (cols - 1);
        const spacingY = (H - marginY * 2) / (rows - 1);
        return {
          id: n.id,
          label: n.label,
          x: marginX + col * spacingX + (Math.random() - 0.5) * 40,
          y: marginY + row * spacingY + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 28,
          color: n.color,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.01,
        };
      });
    };

    const spawnPacket = () => {
      const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
      const reverse = Math.random() > 0.5;
      packetsRef.current.push({
        fromNode: reverse ? conn[1] : conn[0],
        toNode: reverse ? conn[0] : conn[1],
        progress: 0,
        speed: 0.004 + Math.random() * 0.004,
        color: nodesRef.current[reverse ? conn[1] : conn[0]]?.color ?? '#00d4ff',
      });
    };

    // Spawn packets periodically
    const packetInterval = setInterval(spawnPacket, 600);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;
      if (nodes.length === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Update node positions (gentle drift)
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;
        // Bounce off edges
        if (node.x < node.radius || node.x > W - node.radius) node.vx *= -1;
        if (node.y < node.radius || node.y > H - node.radius) node.vy *= -1;
        node.x = Math.max(node.radius, Math.min(W - node.radius, node.x));
        node.y = Math.max(node.radius, Math.min(H - node.radius, node.y));
      });

      // Draw connections
      CONNECTIONS.forEach(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        if (!from || !to) return;

        const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        grad.addColorStop(0, `${from.color}30`);
        grad.addColorStop(1, `${to.color}30`);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw data packets
      packetsRef.current = packetsRef.current.filter((p) => p.progress <= 1);
      packetsRef.current.forEach((packet) => {
        packet.progress += packet.speed;
        const from = nodes[packet.fromNode];
        const to = nodes[packet.toNode];
        if (!from || !to) return;

        const x = from.x + (to.x - from.x) * packet.progress;
        const y = from.y + (to.y - from.y) * packet.progress;

        // Packet trail
        const trailGrad = ctx.createRadialGradient(x, y, 0, x, y, 10);
        trailGrad.addColorStop(0, `${packet.color}cc`);
        trailGrad.addColorStop(1, `${packet.color}00`);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = trailGrad;
        ctx.fill();

        // Packet core
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pulseScale = 1 + Math.sin(node.pulse) * 0.08;
        const glowRadius = node.radius * pulseScale;

        // Outer glow ring
        const outerGlow = ctx.createRadialGradient(
          node.x, node.y, glowRadius * 0.6,
          node.x, node.y, glowRadius * 1.8
        );
        outerGlow.addColorStop(0, `${node.color}25`);
        outerGlow.addColorStop(1, `${node.color}00`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Node background
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#0d1117';
        ctx.fill();

        // Node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${node.color}80`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Label
        ctx.fillStyle = 'rgba(201, 209, 217, 0.8)';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + glowRadius + 16);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(packetInterval);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ pointerEvents: 'none' }}
    />
  );
}