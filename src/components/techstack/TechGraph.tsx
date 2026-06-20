import { useEffect, useRef, useState } from 'react';
import { TECH_NODES } from '../../data/portfolio';
import type { TechNode } from '../../types';

const GROUP_COLORS: Record<TechNode['group'], string> = {
  language: '#f59e0b',
  data: '#00d4ff',
  database: '#10b981',
  backend: '#6366f1',
  frontend: '#38bdf8',
  cloud: '#8b5cf6',
  devops: '#ef4444',
};

const GROUP_LABELS: Record<TechNode['group'], string> = {
  language: 'Languages',
  data: 'Data Engineering',
  database: 'Databases',
  backend: 'Backend',
  frontend: 'Frontend',
  cloud: 'Cloud',
  devops: 'DevOps',
};

interface CanvasNode extends TechNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
}

export default function TechGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<CanvasNode[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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
      const cx = W / 2;
      const cy = H / 2;

      // Group nodes by category and place in clusters
      const groups = [...new Set(TECH_NODES.map((n) => n.group))];
      const angleStep = (Math.PI * 2) / groups.length;
      const clusterRadius = Math.min(W, H) * 0.3;

      nodesRef.current = TECH_NODES.map((node) => {
        const groupIdx = groups.indexOf(node.group);
        const angle = groupIdx * angleStep - Math.PI / 2;
        const clusterX = cx + Math.cos(angle) * clusterRadius;
        const clusterY = cy + Math.sin(angle) * clusterRadius;
        const jitter = 50;

        const x = clusterX + (Math.random() - 0.5) * jitter;
        const y = clusterY + (Math.random() - 0.5) * jitter;

        return {
          ...node,
          x,
          y,
          targetX: x,
          targetY: y,
          vx: 0,
          vy: 0,
        };
      });
    };

    const getNodeRadius = (node: CanvasNode) => {
      return 14 + (node.proficiency / 100) * 12;
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;
      if (nodes.length === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Gentle float animation
      nodes.forEach((node) => {
        node.x += Math.sin(Date.now() * 0.001 + nodes.indexOf(node)) * 0.3;
        node.y += Math.cos(Date.now() * 0.0008 + nodes.indexOf(node) * 1.3) * 0.2;

        // Keep within bounds
        const r = getNodeRadius(node);
        node.x = Math.max(r + 20, Math.min(W - r - 20, node.x));
        node.y = Math.max(r + 20, Math.min(H - r - 20, node.y));
      });

      // Build a node lookup map
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));

      // Draw edges first
      nodes.forEach((node) => {
        node.connections.forEach((connId) => {
          const target = nodeMap.get(connId);
          if (!target) return;

          const isHovered =
            hoveredRef.current === node.id ||
            hoveredRef.current === connId;

          const fromColor = GROUP_COLORS[node.group];
          const toColor = GROUP_COLORS[target.group];

          const grad = ctx.createLinearGradient(
            node.x, node.y, target.x, target.y
          );
          grad.addColorStop(0, `${fromColor}${isHovered ? '60' : '20'}`);
          grad.addColorStop(1, `${toColor}${isHovered ? '60' : '20'}`);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = isHovered ? 1.5 : 0.8;
          ctx.stroke();

          // Animate a packet along hovered connections
          if (isHovered) {
            const t = (Date.now() % 2000) / 2000;
            const px = node.x + (target.x - node.x) * t;
            const py = node.y + (target.y - node.y) * t;
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = fromColor;
            ctx.fill();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const color = GROUP_COLORS[node.group];
        const r = getNodeRadius(node);
        const isHovered = hoveredRef.current === node.id;
        const isConnected =
          hoveredRef.current !== null &&
          hoveredRef.current !== node.id &&
          (nodeMap.get(hoveredRef.current)?.connections.includes(node.id) ||
            node.connections.includes(hoveredRef.current ?? ''));

        const alpha = hoveredRef.current
          ? isHovered || isConnected
            ? 1
            : 0.25
          : 1;

        ctx.globalAlpha = alpha;

        // Glow
        if (isHovered) {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 2.5);
          glow.addColorStop(0, `${color}40`);
          glow.addColorStop(1, `${color}00`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Node background
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? `${color}25` : '#0d1117';
        ctx.fill();

        // Proficiency ring
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (Math.PI * 2 * node.proficiency) / 100;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, startAngle, endAngle);
        ctx.strokeStyle = color;
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.stroke();

        // Remaining ring (dim)
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, endAngle, startAngle + Math.PI * 2);
        ctx.strokeStyle = `${color}20`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = isHovered ? '#ffffff' : '#c9d1d9';
        ctx.font = `${isHovered ? 600 : 500} ${isHovered ? 11 : 10}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y);

        ctx.globalAlpha = 1;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found: CanvasNode | null = null;
      for (const node of nodesRef.current) {
        const r = getNodeRadius(node);
        const dist = Math.hypot(mx - node.x, my - node.y);
        if (dist < r) {
          found = node;
          break;
        }
      }

      hoveredRef.current = found?.id ?? null;
      setHoveredNode(found);
      setTooltipPos({ x: mx, y: my });
      canvas.style.cursor = found ? 'pointer' : 'default';
    };

    const handleMouseLeave = () => {
      hoveredRef.current = null;
      setHoveredNode(null);
      canvas.style.cursor = 'default';
    };

    resize();
    draw();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full rounded-2xl"
        style={{ height: 'clamp(380px, 55vw, 560px)' }}
      />

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className="absolute pointer-events-none z-20 glass rounded-xl p-3
                     border border-white/10 shadow-xl min-w-[160px]"
          style={{
            left: Math.min(tooltipPos.x + 12, (canvasRef.current?.offsetWidth ?? 400) - 180),
            top: Math.max(tooltipPos.y - 60, 8),
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: GROUP_COLORS[hoveredNode.group],
                boxShadow: `0 0 6px ${GROUP_COLORS[hoveredNode.group]}`,
              }}
            />
            <span className="text-white font-600 text-sm">{hoveredNode.label}</span>
          </div>
          <div
            className="font-mono text-[10px] px-1.5 py-0.5 rounded mb-2 w-fit"
            style={{
              background: `${GROUP_COLORS[hoveredNode.group]}15`,
              color: GROUP_COLORS[hoveredNode.group],
              border: `1px solid ${GROUP_COLORS[hoveredNode.group]}30`,
            }}
          >
            {GROUP_LABELS[hoveredNode.group]}
          </div>
          {/* Proficiency bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${hoveredNode.proficiency}%`,
                  backgroundColor: GROUP_COLORS[hoveredNode.group],
                  boxShadow: `0 0 6px ${GROUP_COLORS[hoveredNode.group]}`,
                }}
              />
            </div>
            <span className="font-mono text-[10px] text-[#8b949e]">
              {hoveredNode.proficiency}%
            </span>
          </div>
          <p className="font-mono text-[10px] text-[#6e7681] mt-2">
            Connected to {hoveredNode.connections.length} technologies
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-xs">
        {Object.entries(GROUP_LABELS).map(([group, label]) => (
          <div key={group} className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: GROUP_COLORS[group as TechNode['group']] }}
            />
            <span className="font-mono text-[9px] text-[#6e7681]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}