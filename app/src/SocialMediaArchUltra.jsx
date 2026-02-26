import { useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import plotlyLogo from "./logos/plotly.svg";
import d3Logo from "./logos/d3.svg";
import openaiLogo from "./logos/openai.svg";
import geminiLogo from "./logos/google-gemini.svg";
import claudeLogo from "./logos/claude.svg";
import n8nLogo from "./logos/n8n.svg";
import supabaseLogo from "./logos/supabase.svg";
import langfuseLogo from "./logos/langfuse.svg";
import postgresqlLogo from "./logos/postgresql.svg";
import redisLogo from "./logos/redis.svg";
import pineconeLogo from "./logos/pinecone.svg";
import cloudflareLogo from "./logos/cloudflare.svg";
import pythonLogo from "./logos/python.svg";

const C = {
  bg: "#f4f6f8",
  surface: "#ffffff",
  border: "#d5dce5",
  text: "#152236",
  sub: "#5b6b80",
  muted: "#8a98aa",

  frontend: "#3b82f6",
  source: "#8b5cf6",
  backend: "#10b981",
  data: "#f59e0b",
  admin: "#ef4444",

  flow: "#5c7897",
  active: "#10b981",
  pending: "#f59e0b",
  assistantFlow: "#0ea5e9",
  ingestFlow: "#0f766e",
  adminFlow: "#ef4444",
  ragFlow: "#f59e0b",
  llmFlow: "#6366f1",
  calendarFlow: "#14b8a6",
  knowledgeFlow: "#ec4899",
  addonFlow: "#f97316",
};

const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif";
const notionLogo = "/logos/notion.svg";

const NOTES = {
  dashboard: ["Main Dashboard", "SPA com filtros globais e widgets em tempo real."],
  modules: ["Social Modules", "Paineis de sentimento, volume, geografia e tendencias."],
  assistant: ["AI Assistant", "Perguntas do front-end passam via Edge Functions antes da orquestracao."],
  knowledge: ["Base de Conhecimento", "Fluxo dedicado de conhecimento, separado do fluxo RAG administrativo."],
  notion: ["Notion Integration", "Planejado: sync de notas, tarefas e base de conhecimento."],
  nebula: ["Nebula", "Fonte especializada conectada exclusivamente a Base de Conhecimento."],

  brandwatch: ["Brandwatch", "Social listening e mentions para enrich de contexto."],
  sprout: ["Sprout Social", "Metricas de engajamento e acoes de publicacao."],
  tse: ["Public Datasets", "Fontes publicas usadas para enrichment e joins analiticos."],
  calendar: ["Calendario", "Agenda/eventos conectados direto a automacoes no n8n."],
  ingest: ["API + Python", "Pipeline de ingestao/normalizacao antes de persistir no Postgres."],
  influencers: ["Influencers", "Addon para analise e gestao de influenciadores."],
  smm: ["SMM", "Addon para operacao de social media management."],
  allEars: ["All Ears", "Addon para escuta ampliada e alertas."],

  hub: ["n8n Orchestrator", "Core de workflows: roteamento de tarefas, retries e webhooks."],
  openai: ["OpenAI GPT-4o", "Classificacao, resumo e extracao de entidades."],
  gemini: ["Google Gemini", "Analise multimodal para imagem, OCR e screenshot."],
  claude: ["Anthropic Claude", "Raciocinio de contexto longo e sintese de RAG."],
  auth: ["Supabase Auth", "JWT, RLS e isolamento por tenant."],
  edge: ["Edge Functions", "Camada API de baixa latencia no runtime Deno."],
  langfuse: ["Langfuse", "Tracing, custo por prompt e avaliacoes."],

  postgres: ["PostgreSQL", "Fonte relacional principal por tenant."],
  redis: ["Redis", "Cache de sessao e memoria curta da conversa."],
  pinecone: ["Pinecone", "Busca vetorial semantica com namespaces."],
  r2: ["Cloudflare R2", "Objetos e documentos com URL assinada."],

  adminPortal: ["Admin Portal", "Provisiona tenant, perfis, billing e auditoria."],
  ragControl: ["RAG Control", "Uploads, namespaces e tuning do pipeline."],
};

const NODE_LOGOS = {
  dashboard: [{ type: "image", src: reactLogo }, { type: "image", src: viteLogo }],
  modules: [{ type: "image", src: plotlyLogo }, { type: "image", src: d3Logo }],
  assistant: [],
  knowledge: [],
  notion: [{ type: "image", src: notionLogo }],
  nebula: [],
  brandwatch: [],
  sprout: [],
  tse: [],
  calendar: [],
  ingest: [{ type: "image", src: pythonLogo }],
  influencers: [],
  smm: [],
  allEars: [],
  openai: [{ type: "image", src: openaiLogo }],
  gemini: [{ type: "image", src: geminiLogo }],
  claude: [{ type: "image", src: claudeLogo }],
  hub: [{ type: "image", src: n8nLogo }],
  auth: [{ type: "image", src: supabaseLogo }],
  edge: [{ type: "image", src: supabaseLogo }],
  langfuse: [{ type: "image", src: langfuseLogo }],
  postgres: [{ type: "image", src: postgresqlLogo }],
  redis: [{ type: "image", src: redisLogo }],
  pinecone: [{ type: "image", src: pineconeLogo }],
  r2: [{ type: "image", src: cloudflareLogo }],
  adminPortal: [],
  ragControl: [],
};

function midTop(n) {
  return { x: n.x + n.w / 2, y: n.y };
}
function midBottom(n) {
  return { x: n.x + n.w / 2, y: n.y + n.h };
}
function midLeft(n) {
  return { x: n.x, y: n.y + n.h / 2 };
}
function midRight(n) {
  return { x: n.x + n.w, y: n.y + n.h / 2 };
}

function Node({ n, activeKey, setActive, setMouse, isSelected, onSelectNode }) {
  const hovered = activeKey === n.id;
  const selected = Boolean(isSelected);
  const logos = (NODE_LOGOS[n.id] || []).filter((logo) => logo.type === "image");
  const logoSize = 32;
  const logoGap = 8;
  const logoTotalW = logos.length ? logos.length * logoSize + (logos.length - 1) * logoGap : 0;
  const logoStartX = n.x + n.w - 12 - logoTotalW;
  const logoY = n.y + 9;
  return (
    <g
      onMouseEnter={() => setActive(n.id)}
      onMouseLeave={() => setActive(null)}
      onClick={(e) => {
        e.stopPropagation();
        onSelectNode(n.id);
      }}
      onMouseMove={(e) => {
        const svg = e.currentTarget.ownerSVGElement;
        if (!svg) return;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        const p = pt.matrixTransform(ctm.inverse());
        setMouse({ x: p.x, y: p.y });
      }}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={n.x}
        y={n.y}
        width={n.w}
        height={n.h}
        rx="10"
        fill={C.surface}
        stroke={selected || hovered ? n.color : C.border}
        strokeWidth={selected ? 2.8 : hovered ? 2.5 : 1.6}
        filter={selected || hovered ? "url(#shadow)" : "none"}
      />
      <rect x={n.x + 4} y={n.y + 4} width="5" height={n.h - 8} rx="3" fill={n.color} />

      <text x={n.x + 16} y={n.y + 25} fill={C.text} fontSize="13" fontWeight="800">
        {n.title}
      </text>
      <text x={n.x + 16} y={n.y + 40} fill={C.sub} fontSize="10.5">
        {n.subtitle}
      </text>

      {logos.length ? (
        <g>
          {logos.map((logo, idx) => {
            const x = logoStartX + idx * (logoSize + logoGap);
            return (
              <image
                key={`${n.id}-logo-${idx}`}
                href={logo.src}
                x={x}
                y={logoY}
                width={logoSize}
                height={logoSize}
                preserveAspectRatio="xMidYMid meet"
              />
            );
          })}
        </g>
      ) : null}

      {n.badge ? (
        <g>
          <rect x={n.x + 16} y={n.y + n.h - 17} width="58" height="12" rx="6" fill={n.badge === "ACTIVE" ? "#dcfce7" : "#fef3c7"} />
          <text x={n.x + 45} y={n.y + n.h - 8} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={n.badge === "ACTIVE" ? "#15803d" : "#b45309"}>
            {n.badge}
          </text>
        </g>
      ) : null}
    </g>
  );
}

function Link({
  from,
  to,
  color = C.flow,
  width = 3,
  marker = "arrFlow",
  label,
  dash,
  endDir = "auto",
  highlighted = true,
  onClick,
}) {
  let d = "";
  if (endDir === "down") {
    const midY = from.y + (to.y - from.y) * 0.52;
    d = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
  } else {
    const dx = to.x - from.x;
    const c1x = from.x + dx * 0.35;
    const c2x = from.x + dx * 0.65;
    d = `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
  }

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={highlighted ? width : Math.max(1.2, width - 1.2)}
        strokeDasharray={dash}
        markerEnd={`url(#${marker})`}
        opacity={highlighted ? 0.95 : 0.16}
        style={{ transition: "opacity 0.18s ease, stroke-width 0.18s ease" }}
      />
      {label ? (
        <text
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2 - 8}
          textAnchor="middle"
          fontSize="10"
          fill={highlighted ? C.muted : "#b7c0cb"}
          fontWeight="600"
          opacity={highlighted ? 1 : 0.35}
          style={{ transition: "opacity 0.18s ease" }}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

export default function SocialMediaIntelArchitectureDiagram() {
  const [activeKey, setActiveKey] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedFlowColor, setSelectedFlowColor] = useState(null);
  const svgRef = useRef(null);

  const downloadSvg = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "map6-ultra-architecture.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const nodes = useMemo(
    () => ({
      dashboard: { id: "dashboard", title: "Main Dashboard", subtitle: "React + Vite + real-time widgets", x: 70, y: 120, w: 280, h: 74, color: C.frontend, badge: "ACTIVE" },
      modules: { id: "modules", title: "Social Modules", subtitle: "Sentiment, geo, trends, volume", x: 380, y: 120, w: 280, h: 74, color: C.frontend, badge: "ACTIVE" },
      assistant: { id: "assistant", title: "AI Assistant", subtitle: "RAG chat + streaming response", x: 70, y: 220, w: 280, h: 74, color: C.active, badge: "ACTIVE" },
      knowledge: { id: "knowledge", title: "Base de Conhecimento", subtitle: "Curadoria + contexto RAG", x: 380, y: 320, w: 280, h: 74, color: C.knowledgeFlow, badge: "ACTIVE" },

      brandwatch: { id: "brandwatch", title: "Brandwatch", subtitle: "Mentions + social listening", x: 760, y: 110, w: 250, h: 76, color: C.source },
      sprout: { id: "sprout", title: "Sprout Social", subtitle: "Engagement + publishing", x: 1030, y: 110, w: 250, h: 76, color: C.source },
      tse: { id: "tse", title: "Public Datasets", subtitle: "Open data + references", x: 760, y: 205, w: 250, h: 76, color: C.source },
      notion: { id: "notion", title: "Notion Integration", subtitle: "Notes/tasks sync (planned)", x: 1030, y: 205, w: 250, h: 76, color: C.source, badge: "TBC" },
      nebula: { id: "nebula", title: "Nebula", subtitle: "Knowledge source", x: 760, y: 300, w: 250, h: 76, color: C.source },
      calendar: { id: "calendar", title: "Calendario", subtitle: "Agenda + eventos", x: 1060, y: 300, w: 220, h: 76, color: C.calendarFlow },
      ingest: { id: "ingest", title: "API + Python", subtitle: "Ingestion pipeline", x: 760, y: 565, w: 250, h: 88, color: C.ingestFlow },
      influencers: { id: "influencers", title: "Influencers", subtitle: "Creator ops", x: 250, y: 520, w: 170, h: 64, color: C.addonFlow },
      smm: { id: "smm", title: "SMM", subtitle: "Social mgmt", x: 430, y: 520, w: 170, h: 64, color: C.addonFlow },
      allEars: { id: "allEars", title: "All Ears", subtitle: "Listening addon", x: 340, y: 600, w: 170, h: 64, color: C.addonFlow },

      openai: { id: "openai", title: "OpenAI GPT-4o", subtitle: "Classify + summarize", x: 140, y: 830, w: 280, h: 72, color: C.backend },
      gemini: { id: "gemini", title: "Google Gemini", subtitle: "Multimodal analysis", x: 140, y: 930, w: 280, h: 72, color: C.backend },
      claude: { id: "claude", title: "Anthropic Claude", subtitle: "Long-context reasoning", x: 140, y: 1030, w: 280, h: 72, color: C.backend },

      hub: { id: "hub", title: "n8n Orchestrator", subtitle: "Workflow engine + routing", x: 530, y: 920, w: 340, h: 96, color: C.backend, badge: "ACTIVE" },

      auth: { id: "auth", title: "Supabase Auth", subtitle: "JWT + RLS", x: 980, y: 830, w: 280, h: 72, color: C.backend },
      edge: { id: "edge", title: "Edge Functions", subtitle: "Deno API layer", x: 980, y: 930, w: 280, h: 72, color: C.backend },
      langfuse: { id: "langfuse", title: "Langfuse", subtitle: "Tracing + cost", x: 980, y: 1030, w: 280, h: 72, color: C.backend },

      postgres: { id: "postgres", title: "PostgreSQL", subtitle: "Relational data", x: 505, y: 1320, w: 195, h: 72, color: C.data },
      redis: { id: "redis", title: "Redis", subtitle: "Session + memory", x: 720, y: 1320, w: 195, h: 72, color: C.data },
      pinecone: { id: "pinecone", title: "Pinecone", subtitle: "Vector retrieval", x: 935, y: 1320, w: 195, h: 72, color: C.data },
      r2: { id: "r2", title: "Cloudflare R2", subtitle: "Document storage", x: 1150, y: 1320, w: 195, h: 72, color: C.data },

      adminPortal: { id: "adminPortal", title: "Admin Portal", subtitle: "Tenants, roles, billing", x: 60, y: 1320, w: 240, h: 72, color: C.admin },
      ragControl: { id: "ragControl", title: "RAG Control", subtitle: "Uploads + namespaces", x: 60, y: 1410, w: 240, h: 72, color: C.admin },
    }),
    []
  );

  const onSelectNode = (nodeId) => {
    setSelectedFlowColor(null);
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  };

  const onSelectFlowColor = (flowColor) => {
    setSelectedNodeId(null);
    setSelectedFlowColor((prev) => (prev === flowColor ? null : flowColor));
  };

  const isConnectionHighlighted = (fromId, toId, color) => {
    if (selectedNodeId) return fromId === selectedNodeId || toId === selectedNodeId;
    if (selectedFlowColor) return color === selectedFlowColor;
    return true;
  };

  const tip = activeKey ? NOTES[activeKey] : null;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <h1 style={{ margin: 0, fontFamily: FONT, fontSize: 22, fontWeight: 800, letterSpacing: 0.4, color: C.text }}>
          Map6 ULTRA
        </h1>
        <button
          type="button"
          onClick={downloadSvg}
          style={{
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 700,
            padding: "6px 10px",
            borderRadius: 8,
            border: `1px solid ${C.border}`,
            background: C.surface,
            color: C.sub,
            cursor: "pointer",
          }}
        >
          Save SVG
        </button>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 1400 1680"
        width="100%"
        height="auto"
        role="img"
        aria-label="Social Media Intelligence - architecture flow diagram"
        onClick={() => {
          setSelectedNodeId(null);
          setSelectedFlowColor(null);
        }}
      >
      <defs>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1.8" cy="1.8" r="1" fill="#d8dee6" />
        </pattern>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(16,24,40,0.18)" />
        </filter>

        <marker id="arrFlow" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.flow} />
        </marker>
        <marker id="arrActive" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.active} />
        </marker>
        <marker id="arrPending" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.pending} />
        </marker>
        <marker id="arrAssist" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.assistantFlow} />
        </marker>
        <marker id="arrIngest" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.ingestFlow} />
        </marker>
        <marker id="arrAdmin" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.adminFlow} />
        </marker>
        <marker id="arrRag" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.ragFlow} />
        </marker>
        <marker id="arrKnowledge" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.knowledgeFlow} />
        </marker>
        <marker id="arrLlm" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.llmFlow} />
        </marker>
        <marker id="arrCalendar" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.calendarFlow} />
        </marker>
        <marker id="arrAddon" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.addonFlow} />
        </marker>
      </defs>

      <style>{`text{font-family:${FONT}}`}</style>

      <rect x="0" y="0" width="1400" height="1680" fill={C.bg} />
      <rect x="0" y="0" width="1400" height="1680" fill="url(#dots)" opacity="0.45" />

      <rect x="40" y="35" width="640" height="390" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
      <text x="58" y="62" fontSize="12" fontWeight="800" fill={C.frontend} letterSpacing="1.4">FRONT-END</text>

      <rect x="740" y="55" width="560" height="360" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
      <text x="758" y="82" fontSize="12" fontWeight="800" fill={C.source} letterSpacing="1.4">EXTERNAL SOURCES</text>
      <rect x="230" y="470" width="430" height="250" rx="12" fill="#fff7ed" stroke="#fdba74" />
      <text x="252" y="497" fontSize="11" fontWeight="800" fill={C.addonFlow} letterSpacing="1.2">ADDONS</text>

      <rect x="120" y="790" width="1160" height="410" rx="14" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="138" y="817" fontSize="12" fontWeight="800" fill={C.backend} letterSpacing="1.4">INTELLIGENCE & ORCHESTRATION</text>
      <rect x="730" y="490" width="320" height="200" rx="12" fill="#ecfeff" stroke="#99f6e4" />
      <text x="748" y="512" fontSize="11" fontWeight="800" fill={C.ingestFlow} letterSpacing="1.2">INGESTION</text>

      <rect x="470" y="1280" width="900" height="140" rx="14" fill="#fffbeb" stroke="#fde68a" />
      <text x="488" y="1307" fontSize="12" fontWeight="800" fill={C.data} letterSpacing="1.4">DATA & STORAGE</text>

      <rect x="40" y="1280" width="280" height="230" rx="14" fill="#fef2f2" stroke="#fecaca" />
      <text x="58" y="1307" fontSize="12" fontWeight="800" fill={C.admin} letterSpacing="1.4">ADMIN</text>

      <g>
        <Link from={midRight(nodes.dashboard)} to={midLeft(nodes.edge)} color={C.flow} marker="arrFlow" width={3.2} label="api calls" highlighted={isConnectionHighlighted("dashboard", "edge", C.flow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.flow); }} />
        <Link from={midRight(nodes.modules)} to={midLeft(nodes.edge)} color={C.flow} marker="arrFlow" width={3.2} label="module data" highlighted={isConnectionHighlighted("modules", "edge", C.flow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.flow); }} />
        <Link from={midRight(nodes.assistant)} to={midLeft(nodes.edge)} color={C.assistantFlow} marker="arrAssist" width={3.2} label="assistant flow" highlighted={isConnectionHighlighted("assistant", "edge", C.assistantFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.assistantFlow); }} />
        <Link from={midBottom(nodes.knowledge)} to={midTop(nodes.hub)} color={C.knowledgeFlow} marker="arrKnowledge" width={3.2} dash="7 5" label="kb trigger" endDir="down" highlighted={isConnectionHighlighted("knowledge", "hub", C.knowledgeFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.knowledgeFlow); }} />
        <Link from={midRight(nodes.knowledge)} to={midLeft(nodes.r2)} color={C.knowledgeFlow} marker="arrKnowledge" width={3.2} dash="7 5" label="kb docs" highlighted={isConnectionHighlighted("knowledge", "r2", C.knowledgeFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.knowledgeFlow); }} />
        <Link from={midBottom(nodes.nebula)} to={midTop(nodes.knowledge)} color={C.knowledgeFlow} marker="arrKnowledge" width={3.2} endDir="down" label="knowledge feed" highlighted={isConnectionHighlighted("nebula", "knowledge", C.knowledgeFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.knowledgeFlow); }} />

        <Link from={midBottom(nodes.brandwatch)} to={midTop(nodes.ingest)} color={C.ingestFlow} marker="arrIngest" width={3.2} endDir="down" highlighted={isConnectionHighlighted("brandwatch", "ingest", C.ingestFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.ingestFlow); }} />
        <Link from={midBottom(nodes.tse)} to={midTop(nodes.ingest)} color={C.ingestFlow} marker="arrIngest" width={3.2} endDir="down" highlighted={isConnectionHighlighted("tse", "ingest", C.ingestFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.ingestFlow); }} />
        <Link from={midBottom(nodes.sprout)} to={midTop(nodes.ingest)} color={C.ingestFlow} marker="arrIngest" width={3.2} label="ingest" endDir="down" highlighted={isConnectionHighlighted("sprout", "ingest", C.ingestFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.ingestFlow); }} />
        <Link from={midBottom(nodes.ingest)} to={midTop(nodes.postgres)} color={C.ingestFlow} marker="arrIngest" width={3.4} endDir="down" highlighted={isConnectionHighlighted("ingest", "postgres", C.ingestFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.ingestFlow); }} />
        <Link from={midBottom(nodes.calendar)} to={midTop(nodes.hub)} color={C.calendarFlow} marker="arrCalendar" width={3.2} label="calendar jobs" endDir="down" highlighted={isConnectionHighlighted("calendar", "hub", C.calendarFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.calendarFlow); }} />
        <Link from={midBottom(nodes.notion)} to={midTop(nodes.hub)} color={C.pending} marker="arrPending" width={3} dash="8 6" label="notion sync" endDir="down" highlighted={isConnectionHighlighted("notion", "hub", C.pending)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.pending); }} />
        <Link from={midLeft(nodes.influencers)} to={midRight(nodes.ingest)} color={C.addonFlow} marker="arrAddon" width={3.1} label="addon ingest" highlighted={isConnectionHighlighted("influencers", "ingest", C.addonFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.addonFlow); }} />
        <Link from={midLeft(nodes.smm)} to={midRight(nodes.ingest)} color={C.addonFlow} marker="arrAddon" width={3.1} highlighted={isConnectionHighlighted("smm", "ingest", C.addonFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.addonFlow); }} />
        <Link from={midLeft(nodes.allEars)} to={midRight(nodes.ingest)} color={C.addonFlow} marker="arrAddon" width={3.1} highlighted={isConnectionHighlighted("allEars", "ingest", C.addonFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.addonFlow); }} />
        <Link from={midBottom(nodes.ingest)} to={midTop(nodes.postgres)} color={C.addonFlow} marker="arrAddon" width={3.2} endDir="down" label="addon persist" highlighted={isConnectionHighlighted("ingest", "postgres", C.addonFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.addonFlow); }} />

        <Link from={midRight(nodes.openai)} to={midLeft(nodes.hub)} color={C.llmFlow} marker="arrLlm" width={3.2} highlighted={isConnectionHighlighted("openai", "hub", C.llmFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.llmFlow); }} />
        <Link from={midRight(nodes.gemini)} to={midLeft(nodes.hub)} color={C.llmFlow} marker="arrLlm" width={3.2} highlighted={isConnectionHighlighted("gemini", "hub", C.llmFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.llmFlow); }} />
        <Link from={midRight(nodes.claude)} to={midLeft(nodes.hub)} color={C.llmFlow} marker="arrLlm" width={3.2} highlighted={isConnectionHighlighted("claude", "hub", C.llmFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.llmFlow); }} />

        <Link from={midRight(nodes.hub)} to={midLeft(nodes.auth)} color={C.flow} marker="arrFlow" width={3.2} highlighted={isConnectionHighlighted("hub", "auth", C.flow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.flow); }} />
        <Link from={midRight(nodes.edge)} to={midLeft(nodes.hub)} color={C.assistantFlow} marker="arrAssist" width={3.2} label="to n8n" highlighted={isConnectionHighlighted("edge", "hub", C.assistantFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.assistantFlow); }} />
        <Link from={midRight(nodes.hub)} to={midLeft(nodes.langfuse)} color={C.flow} marker="arrFlow" width={3.2} highlighted={isConnectionHighlighted("hub", "langfuse", C.flow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.flow); }} />
        <Link from={midBottom(nodes.edge)} to={midTop(nodes.postgres)} color={C.flow} marker="arrFlow" width={3.2} label="persist" endDir="down" highlighted={isConnectionHighlighted("edge", "postgres", C.flow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.flow); }} />

        <Link from={midBottom(nodes.hub)} to={midTop(nodes.redis)} color={C.active} marker="arrActive" width={4} label="memory" endDir="down" highlighted={isConnectionHighlighted("hub", "redis", C.active)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.active); }} />
        <Link from={midBottom(nodes.hub)} to={midTop(nodes.pinecone)} color={C.active} marker="arrActive" width={4} label="index/search" endDir="down" highlighted={isConnectionHighlighted("hub", "pinecone", C.active)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.active); }} />
        <Link from={midBottom(nodes.hub)} to={midTop(nodes.r2)} color={C.active} marker="arrActive" width={4} label="files" endDir="down" highlighted={isConnectionHighlighted("hub", "r2", C.active)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.active); }} />

        <Link from={midRight(nodes.adminPortal)} to={midLeft(nodes.auth)} color={C.adminFlow} marker="arrAdmin" width={3.2} dash="7 5" label="admin auth" highlighted={isConnectionHighlighted("adminPortal", "auth", C.adminFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.adminFlow); }} />
        <Link from={midRight(nodes.adminPortal)} to={midLeft(nodes.edge)} color={C.adminFlow} marker="arrAdmin" width={3.2} dash="7 5" label="admin api" highlighted={isConnectionHighlighted("adminPortal", "edge", C.adminFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.adminFlow); }} />
        <Link from={midRight(nodes.ragControl)} to={midLeft(nodes.r2)} color={C.ragFlow} marker="arrRag" width={3.2} dash="8 6" label="docs" highlighted={isConnectionHighlighted("ragControl", "r2", C.ragFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.ragFlow); }} />
        <Link from={midRight(nodes.ragControl)} to={midLeft(nodes.hub)} color={C.ragFlow} marker="arrRag" width={3.2} dash="8 6" label="trigger n8n" highlighted={isConnectionHighlighted("ragControl", "hub", C.ragFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.ragFlow); }} />
      </g>

      <Node n={nodes.dashboard} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "dashboard"} onSelectNode={onSelectNode} />
      <Node n={nodes.modules} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "modules"} onSelectNode={onSelectNode} />
      <Node n={nodes.assistant} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "assistant"} onSelectNode={onSelectNode} />
      <Node n={nodes.knowledge} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "knowledge"} onSelectNode={onSelectNode} />
      <Node n={nodes.brandwatch} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "brandwatch"} onSelectNode={onSelectNode} />
      <Node n={nodes.sprout} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "sprout"} onSelectNode={onSelectNode} />
      <Node n={nodes.tse} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "tse"} onSelectNode={onSelectNode} />
      <Node n={nodes.notion} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "notion"} onSelectNode={onSelectNode} />
      <Node n={nodes.nebula} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "nebula"} onSelectNode={onSelectNode} />
      <Node n={nodes.calendar} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "calendar"} onSelectNode={onSelectNode} />
      <Node n={nodes.ingest} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "ingest"} onSelectNode={onSelectNode} />
      <Node n={nodes.influencers} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "influencers"} onSelectNode={onSelectNode} />
      <Node n={nodes.smm} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "smm"} onSelectNode={onSelectNode} />
      <Node n={nodes.allEars} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "allEars"} onSelectNode={onSelectNode} />

      <Node n={nodes.openai} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "openai"} onSelectNode={onSelectNode} />
      <Node n={nodes.gemini} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "gemini"} onSelectNode={onSelectNode} />
      <Node n={nodes.claude} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "claude"} onSelectNode={onSelectNode} />
      <Node n={nodes.hub} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "hub"} onSelectNode={onSelectNode} />
      <Node n={nodes.auth} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "auth"} onSelectNode={onSelectNode} />
      <Node n={nodes.edge} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "edge"} onSelectNode={onSelectNode} />
      <Node n={nodes.langfuse} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "langfuse"} onSelectNode={onSelectNode} />

      <Node n={nodes.postgres} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "postgres"} onSelectNode={onSelectNode} />
      <Node n={nodes.redis} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "redis"} onSelectNode={onSelectNode} />
      <Node n={nodes.pinecone} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "pinecone"} onSelectNode={onSelectNode} />
      <Node n={nodes.r2} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "r2"} onSelectNode={onSelectNode} />

      <Node n={nodes.adminPortal} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "adminPortal"} onSelectNode={onSelectNode} />
      <Node n={nodes.ragControl} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "ragControl"} onSelectNode={onSelectNode} />

      <g transform="translate(1090, 1570)">
        <rect x="0" y="0" width="260" height="56" rx="10" fill={C.surface} stroke={C.border} />
        <path d="M16 16 H56" stroke={C.active} strokeWidth="3.5" markerEnd="url(#arrActive)" />
        <text x="66" y="20" fontSize="10" fill={C.sub}>Fluxo principal</text>
        <path d="M16 34 H56" stroke={C.pending} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arrPending)" />
        <text x="66" y="38" fontSize="10" fill={C.sub}>Fluxo planejado</text>
      </g>

      {tip ? (
        <g pointerEvents="none">
          <rect x={Math.min(mouse.x + 12, 1080)} y={Math.min(mouse.y + 12, 1450)} width="300" height="54" rx="9" fill={C.surface} stroke={C.border} />
          <text x={Math.min(mouse.x + 24, 1092)} y={Math.min(mouse.y + 32, 1470)} fontSize="12" fontWeight="700" fill={C.text}>
            {tip[0]}
          </text>
          <text x={Math.min(mouse.x + 24, 1092)} y={Math.min(mouse.y + 48, 1466)} fontSize="10.5" fill={C.sub}>
            {tip[1]}
          </text>
        </g>
      ) : null}
      </svg>
    </div>
  );
}
