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
import windmillLogo from "./logos/windmill.svg";
import airflowLogo from "./logos/airflow.svg";
import kafkaLogo from "./logos/kafka.svg";
import nifiLogo from "./logos/nifi.svg";
import zookeeperLogo from "./logos/zookeeper.svg";
import caddyLogo from "./logos/caddy.svg";
import flowfileLogo from "./logos/flowfile.svg";
import zapierLogo from "./logos/zapier.svg";
import workatoLogo from "./logos/workato.svg";
import prefectLogo from "./logos/prefect.svg";
import autogenLogo from "./logos/autogen.svg";
import haystackLogo from "./logos/haystack.svg";
import kubeflowLogo from "./logos/kubeflow.svg";
import mlflowLogo from "./logos/mlflow.svg";
import zenmlLogo from "./logos/zenml.svg";
import clickupLogo from "./logos/clickup.svg";
import vellumLogo from "./logos/vellum.svg";
import orbyLogo from "./logos/orby.svg";

// ── LLMs & Inference ─────────────────────────────────────────
import mistralLogo       from "./logos/mistral.svg";
import groqLogo          from "./logos/groq.svg";
import cohereLogo        from "./logos/cohere.svg";
import llamaLogo         from "./logos/llama.svg";
import deepseekLogo      from "./logos/deepseek.svg";
// ── Observability & Monitoring ────────────────────────────────
import wandbLogo         from "./logos/wandb.svg";
import sentryLogo        from "./logos/sentry.svg";
import prometheusLogo    from "./logos/prometheus.svg";
import opentelemetryLogo from "./logos/opentelemetry.svg";
import datadogLogo       from "./logos/datadog.svg";
// ── Databases & Search ────────────────────────────────────────
import weaviateLogo      from "./logos/weaviate.svg";
import neo4jLogo         from "./logos/neo4j.svg";
import snowflakeLogo     from "./logos/snowflake.svg";
import duckdbLogo        from "./logos/duckdb.svg";
import opensearchLogo    from "./logos/opensearch.svg";
import lancedbLogo       from "./logos/lancedb.svg";
// ── Data & ETL ───────────────────────────────────────────────
import airbyteLogo       from "./logos/airbyte.svg";
import fivetranLogo      from "./logos/fivetran.svg";
import temporalLogo      from "./logos/temporal.svg";
// ── Auth & Security ───────────────────────────────────────────
import auth0Logo         from "./logos/auth0.svg";
import vaultLogo         from "./logos/vault.svg";
// ── Comms & Integrations ──────────────────────────────────────
import slackLogo         from "./logos/slack.svg";
import discordLogo       from "./logos/discord.svg";
import twilioLogo        from "./logos/twilio.svg";
// ── Protocols & Transports ────────────────────────────────────
import natsLogo          from "./logos/nats.svg";
import mqttLogo          from "./logos/mqtt.svg";
import sqsLogo           from "./logos/amazonsqs.svg";
import websocketLogo     from "./logos/websocket.svg";
import httpLogo          from "./logos/http.svg";
import grpcLogo          from "./logos/grpc.svg";
import pubsubLogo        from "./logos/pubsub.svg";
import mcpLogo           from "./logos/mcp.svg";
import cronLogo          from "./logos/cron.svg";
import webhookLogo       from "./logos/webhook.svg";
// ── Concept / Role badges ─────────────────────────────────────
import tagFullstack      from "./logos/tag-fullstack.svg";
import tagDevops         from "./logos/tag-devops.svg";
import tagMlops          from "./logos/tag-mlops.svg";
import tagFrontend       from "./logos/tag-frontend.svg";
import tagBackend        from "./logos/tag-backend.svg";
import tagDatawarehouse  from "./logos/tag-datawarehouse.svg";
import tagDatalake       from "./logos/tag-datalake.svg";
import tagBigdata        from "./logos/tag-bigdata.svg";
import tagPipeline       from "./logos/tag-pipeline.svg";
import tagIngestion      from "./logos/tag-ingestion.svg";
import tagStreaming      from "./logos/tag-streaming.svg";
import tagApi            from "./logos/tag-api.svg";
import tagRag            from "./logos/tag-rag.svg";
import tagAgent          from "./logos/tag-agent.svg";
import tagLlm            from "./logos/tag-llm.svg";
import tagRealtime       from "./logos/tag-realtime.svg";
// ── AI Tools & Platforms ──────────────────────────────────────
import apifyLogo        from "./logos/apify.svg";
import llamaindexLogo   from "./logos/llamaindex.svg";
import base44Logo       from "./logos/base44.svg";
import verdantLogo      from "./logos/verdant.svg";
// ── Programming Languages ─────────────────────────────────────
import goLogo            from "./logos/go.svg";
import rustLogo          from "./logos/rust.svg";
import phpLogo           from "./logos/php.svg";
import javaLogo          from "./logos/java.svg";
import rubyLogo          from "./logos/ruby.svg";
import csharpLogo        from "./logos/csharp.svg";
import bashLogo          from "./logos/bash.svg";
import powershellLogo    from "./logos/powershell.svg";
import scalaLogo         from "./logos/scala.svg";
import kotlinLogo        from "./logos/kotlin.svg";
import rlangLogo         from "./logos/r-lang.svg";
import swiftLogo         from "./logos/swift.svg";
import cplusplusLogo     from "./logos/cplusplus.svg";

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
};

const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif";
const notionLogo = "/logos/notion.svg";

const NOTES = {
  dashboard: ["Main Dashboard", "SPA com filtros globais e widgets em tempo real."],
  modules: ["Social Modules", "Paineis de sentimento, volume, geografia e tendencias."],
  assistant: ["AI Assistant", "Perguntas do front-end passam via Edge Functions antes da orquestracao."],
  notion: ["Notion Integration", "Planejado: sync de notas, tarefas e base de conhecimento."],

  sprout: ["Sprout Social", "Metricas de engajamento e acoes de publicacao."],
  tse: ["Public Datasets", "Fontes publicas usadas para enrichment e joins analiticos."],
  ingest: ["API + Python", "Pipeline de ingestao/normalizacao antes de persistir no Postgres."],
  windmill: ["Windmill", "Plataforma de workflows low-code para scripts e automacoes."],
  airflow: ["Apache Airflow", "Orquestrador de pipelines DAG-based para ETL agendado."],
  kafka: ["Apache Kafka", "Streaming de eventos em tempo real com alta throughput."],
  nifi: ["Apache NiFi", "Fluxo de dados entre sistemas com roteamento visual (FlowFile)."],
  zookeeper: ["Apache ZooKeeper", "Servico de coordenacao distribuida para clusters Kafka."],
  caddy: ["Caddy", "Web server com HTTPS automatico e reverse proxy."],
  flowfile: ["FlowFile", "Pipeline de dados Python com UI visual (flowfile.io)."],
  zapier: ["Zapier", "Automacao no-code entre apps via triggers e actions."],
  workato: ["Workato", "Plataforma iPaaS enterprise para integracao e automacao."],
  prefect: ["Prefect", "Orquestrador de workflows Python com observabilidade nativa."],
  autogen: ["AutoGen", "Framework Microsoft para agentes LLM multi-agent conversacionais."],
  haystack: ["Haystack", "Framework NLP/RAG da deepset para pipelines de busca e QA."],
  kubeflow: ["Kubeflow", "Plataforma ML sobre Kubernetes: pipelines, serving e experiments."],
  mlflow: ["MLflow", "Plataforma open-source para ciclo de vida de ML: tracking, models, registry."],
  zenml: ["ZenML", "Framework MLOps para pipelines portateis e reproducíveis."],
  clickup: ["ClickUp AI", "Gestao de projetos com IA integrada para tarefas e docs."],
  vellum: ["Vellum", "Plataforma para deploy, teste e monitoramento de prompts LLM."],
  orby: ["Orby AI", "Automacao de processos por IA com entendimento de documentos."],

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
  // LLMs
  mistral:      ["Mistral AI", "LLM open-source europeu, excelente custo-beneficio."],
  groq:         ["Groq", "Inferencia ultra-rapida de LLMs em hardware dedicado (LPU)."],
  cohere:       ["Cohere", "LLM enterprise focado em embeddings, RAG e busca semantica."],
  llama:        ["Meta LLaMA", "Familia de modelos open-weight da Meta, base de muitos fine-tunes."],
  deepseek:     ["DeepSeek", "LLM chines de alta performance, alternativa competitiva ao GPT-4."],
  // Observability
  wandb:        ["Weights & Biases", "Experiment tracking, model versioning e avaliacao de LLMs."],
  sentry:       ["Sentry", "Error tracking e performance monitoring para aplicacoes."],
  prometheus:   ["Prometheus", "Coleta de metricas time-series, padrao cloud-native."],
  opentelemetry:["OpenTelemetry", "Standard aberto para traces, metricas e logs distribuidos."],
  datadog:      ["Datadog", "APM, logs, metricas e alertas em plataforma unificada."],
  // Databases
  weaviate:     ["Weaviate", "Vector database com suporte a multi-tenancy e GraphQL."],
  neo4j:        ["Neo4j", "Graph database para knowledge graphs e relacoes complexas."],
  snowflake:    ["Snowflake", "Data warehouse cloud com separacao compute/storage."],
  duckdb:       ["DuckDB", "OLAP in-process ultra-rapido, ideal para analytics local."],
  opensearch:   ["OpenSearch", "Busca e analytics distribuida, fork open-source do Elasticsearch."],
  lancedb:      ["LanceDB", "Vector DB local-first em formato Lance, zero infra."],
  // ETL
  airbyte:      ["Airbyte", "ELT open-source com 300+ conectores para sincronizacao de dados."],
  fivetran:     ["Fivetran", "ELT managed enterprise, conectores automatizados e governanca."],
  temporal:     ["Temporal", "Workflow engine duravel para logica de negocio longa e resiliente."],
  // Auth
  auth0:        ["Auth0", "Plataforma de identity: login social, MFA, RBAC enterprise."],
  vault:        ["HashiCorp Vault", "Gestao de segredos, certificados e criptografia centralizada."],
  // Comms
  slack:        ["Slack", "Messaging e integracao de alertas/bots via Webhooks e API."],
  discord:      ["Discord", "Comunicacao em tempo real com bots e webhooks para dev."],
  twilio:       ["Twilio", "API de SMS, voz, WhatsApp e email transacional."],
  // Protocols
  nats:         ["NATS", "Sistema de mensagens cloud-native, leve e de alta performance."],
  mqtt:         ["MQTT", "Protocolo pub/sub leve para IoT e dispositivos com baixa banda."],
  amazonsqs:    ["AWS SQS", "Fila gerenciada de mensagens serverless da AWS."],
  websocket:    ["WebSocket", "Protocolo full-duplex para comunicacao bidirecional em tempo real."],
  http:         ["HTTP/REST", "Protocolo base da web, padrao para APIs REST e webhooks."],
  grpc:         ["gRPC", "RPC de alta performance com Protocol Buffers, ideal para microservicos."],
  pubsub:       ["GCP Pub/Sub", "Mensageria gerenciada do Google Cloud para streaming de eventos."],
  mcp:          ["MCP", "Model Context Protocol da Anthropic para integracao de ferramentas com LLMs."],
  cron:         ["Cron", "Agendamento de tarefas por tempo (ex: '0 * * * *')."],
  webhook:      ["Webhook", "Callback HTTP acionado por eventos entre sistemas."],
  // Concept tags
  "tag-fullstack":    ["Full Stack", "Cobre front-end, back-end, banco de dados e infra."],
  "tag-devops":       ["DevOps", "Praticas de CI/CD, IaC, monitoramento e entrega continua."],
  "tag-mlops":        ["MLOps", "Ciclo de vida de modelos ML: treino, deploy, monitoramento."],
  "tag-frontend":     ["Frontend", "Camada de interface e experiencia do usuario."],
  "tag-backend":      ["Backend", "Logica de negocio, APIs e processamento server-side."],
  "tag-datawarehouse":["Data Warehouse", "Repositorio centralizado para analytics e BI."],
  "tag-datalake":     ["Data Lake", "Armazenamento bruto de dados estruturados e nao-estruturados."],
  "tag-bigdata":      ["Big Data", "Processamento de volumes massivos com frameworks distribuidos."],
  "tag-pipeline":     ["Pipeline", "Sequencia de etapas de transformacao e movimentacao de dados."],
  "tag-ingestion":    ["Ingestion", "Captura e ingestao de dados de fontes externas."],
  "tag-streaming":    ["Streaming", "Processamento de eventos em tempo real de forma continua."],
  "tag-api":          ["API", "Interface de programacao entre sistemas."],
  "tag-rag":          ["RAG", "Retrieval-Augmented Generation: busca + geracao com LLM."],
  "tag-agent":        ["AI Agent", "Sistema autonomo que usa LLM para raciocinar e agir."],
  "tag-llm":          ["LLM", "Large Language Model: modelo de linguagem de grande escala."],
  "tag-realtime":     ["Real-time", "Processamento e entrega com latencia minima (<1s)."],
  // AI Tools & Platforms
  "apify":            ["Apify", "Plataforma de web scraping e automacao — extrai dados da web em escala."],
  "llamaindex":       ["LlamaIndex", "Framework de dados para conectar LLMs a fontes externas via RAG."],
  "base44":           ["Base44", "Plataforma de criacao de apps com IA — low-code AI app builder."],
  "verdant":          ["Verdant.ai", "Plataforma de AI para analises e insights orientados a dados."],
  // Programming Languages
  "lang-go":          ["Go (Golang)", "Linguagem compilada do Google — concorrencia nativa com goroutines."],
  "lang-rust":        ["Rust", "Linguagem de sistemas com seguranca de memoria sem GC."],
  "lang-php":         ["PHP", "Linguagem server-side amplamente usada em web tradicional e CMS."],
  "lang-java":        ["Java", "Linguagem orientada a objetos, plataforma JVM, ecossistema enterprise."],
  "lang-ruby":        ["Ruby", "Linguagem dinamica, elegante, famosa pelo framework Rails."],
  "lang-csharp":      ["C# (.NET)", "Linguagem da Microsoft para apps desktop, web e jogos (Unity)."],
  "lang-bash":        ["Bash / Shell", "Shell scripting para automacao, pipelines e administracao de sistemas."],
  "lang-powershell":  ["PowerShell", "Shell e linguagem de scripting da Microsoft para automacao Windows/Azure."],
  "lang-scala":       ["Scala", "Linguagem JVM funcional e OO — base do Apache Spark."],
  "lang-kotlin":      ["Kotlin", "Linguagem moderna da JetBrains — preferida para Android e backend JVM."],
  "lang-r":           ["R", "Linguagem estatistica para analise de dados, ML e visualizacao."],
  "lang-swift":       ["Swift", "Linguagem da Apple para iOS, macOS e desenvolvimento server-side."],
  "lang-cpp":         ["C++", "Linguagem de sistemas de alto desempenho — jogos, embarcados, ML engines."],
};

const NODE_LOGOS = {
  dashboard: [{ type: "image", src: reactLogo }, { type: "image", src: viteLogo }],
  modules: [{ type: "image", src: plotlyLogo }, { type: "image", src: d3Logo }],
  assistant: [],
  notion: [{ type: "image", src: notionLogo }],
  sprout: [],
  tse: [],
  ingest: [{ type: "image", src: pythonLogo }],
  windmill: [{ type: "image", src: windmillLogo }],
  airflow: [{ type: "image", src: airflowLogo }],
  kafka: [{ type: "image", src: kafkaLogo }],
  nifi: [{ type: "image", src: nifiLogo }],
  zookeeper: [{ type: "image", src: zookeeperLogo }],
  caddy: [{ type: "image", src: caddyLogo }],
  flowfile:  [{ type: "image", src: flowfileLogo }],
  zapier:    [{ type: "image", src: zapierLogo }],
  workato:   [{ type: "image", src: workatoLogo }],
  prefect:   [{ type: "image", src: prefectLogo }],
  autogen:   [{ type: "image", src: autogenLogo }],
  haystack:  [{ type: "image", src: haystackLogo }],
  kubeflow:  [{ type: "image", src: kubeflowLogo }],
  mlflow:    [{ type: "image", src: mlflowLogo }],
  zenml:     [{ type: "image", src: zenmlLogo }],
  clickup:   [{ type: "image", src: clickupLogo }],
  vellum:    [{ type: "image", src: vellumLogo }],
  orby:      [{ type: "image", src: orbyLogo }],
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
  ragControl:  [],
  // LLMs
  mistral:       [{ type: "image", src: mistralLogo }],
  groq:          [{ type: "image", src: groqLogo }],
  cohere:        [{ type: "image", src: cohereLogo }],
  llama:         [{ type: "image", src: llamaLogo }],
  deepseek:      [{ type: "image", src: deepseekLogo }],
  // Observability
  wandb:         [{ type: "image", src: wandbLogo }],
  sentry:        [{ type: "image", src: sentryLogo }],
  prometheus:    [{ type: "image", src: prometheusLogo }],
  opentelemetry: [{ type: "image", src: opentelemetryLogo }],
  datadog:       [{ type: "image", src: datadogLogo }],
  // Databases
  weaviate:      [{ type: "image", src: weaviateLogo }],
  neo4j:         [{ type: "image", src: neo4jLogo }],
  snowflake:     [{ type: "image", src: snowflakeLogo }],
  duckdb:        [{ type: "image", src: duckdbLogo }],
  opensearch:    [{ type: "image", src: opensearchLogo }],
  lancedb:       [{ type: "image", src: lancedbLogo }],
  // ETL
  airbyte:       [{ type: "image", src: airbyteLogo }],
  fivetran:      [{ type: "image", src: fivetranLogo }],
  temporal:      [{ type: "image", src: temporalLogo }],
  // Auth & Security
  auth0:         [{ type: "image", src: auth0Logo }],
  vault:         [{ type: "image", src: vaultLogo }],
  // Comms
  slack:         [{ type: "image", src: slackLogo }],
  discord:       [{ type: "image", src: discordLogo }],
  twilio:        [{ type: "image", src: twilioLogo }],
  // Protocols
  nats:          [{ type: "image", src: natsLogo }],
  mqtt:          [{ type: "image", src: mqttLogo }],
  amazonsqs:     [{ type: "image", src: sqsLogo }],
  websocket:     [{ type: "image", src: websocketLogo }],
  http:          [{ type: "image", src: httpLogo }],
  grpc:          [{ type: "image", src: grpcLogo }],
  pubsub:        [{ type: "image", src: pubsubLogo }],
  mcp:           [{ type: "image", src: mcpLogo }],
  cron:          [{ type: "image", src: cronLogo }],
  webhook:       [{ type: "image", src: webhookLogo }],
  // Concept tags
  "tag-fullstack":     [{ type: "image", src: tagFullstack }],
  "tag-devops":        [{ type: "image", src: tagDevops }],
  "tag-mlops":         [{ type: "image", src: tagMlops }],
  "tag-frontend":      [{ type: "image", src: tagFrontend }],
  "tag-backend":       [{ type: "image", src: tagBackend }],
  "tag-datawarehouse": [{ type: "image", src: tagDatawarehouse }],
  "tag-datalake":      [{ type: "image", src: tagDatalake }],
  "tag-bigdata":       [{ type: "image", src: tagBigdata }],
  "tag-pipeline":      [{ type: "image", src: tagPipeline }],
  "tag-ingestion":     [{ type: "image", src: tagIngestion }],
  "tag-streaming":     [{ type: "image", src: tagStreaming }],
  "tag-api":           [{ type: "image", src: tagApi }],
  "tag-rag":           [{ type: "image", src: tagRag }],
  "tag-agent":         [{ type: "image", src: tagAgent }],
  "tag-llm":           [{ type: "image", src: tagLlm }],
  "tag-realtime":      [{ type: "image", src: tagRealtime }],
  // AI Tools & Platforms
  "apify":             [{ type: "image", src: apifyLogo }],
  "llamaindex":        [{ type: "image", src: llamaindexLogo }],
  "base44":            [{ type: "image", src: base44Logo }],
  "verdant":           [{ type: "image", src: verdantLogo }],
  // Programming Languages
  "lang-go":           [{ type: "image", src: goLogo }],
  "lang-rust":         [{ type: "image", src: rustLogo }],
  "lang-php":          [{ type: "image", src: phpLogo }],
  "lang-java":         [{ type: "image", src: javaLogo }],
  "lang-ruby":         [{ type: "image", src: rubyLogo }],
  "lang-csharp":       [{ type: "image", src: csharpLogo }],
  "lang-bash":         [{ type: "image", src: bashLogo }],
  "lang-powershell":   [{ type: "image", src: powershellLogo }],
  "lang-scala":        [{ type: "image", src: scalaLogo }],
  "lang-kotlin":       [{ type: "image", src: kotlinLogo }],
  "lang-r":            [{ type: "image", src: rlangLogo }],
  "lang-swift":        [{ type: "image", src: swiftLogo }],
  "lang-cpp":          [{ type: "image", src: cplusplusLogo }],
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
    link.download = "mpa6-one-architecture.svg";
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
      notion: { id: "notion", title: "Notion Integration", subtitle: "Notes/tasks sync (planned)", x: 980, y: 220, w: 310, h: 84, color: C.source, badge: "TBC" },

      sprout: { id: "sprout", title: "Sprout Social", subtitle: "Engagement + publishing", x: 980, y: 110, w: 310, h: 84, color: C.source },
      tse: { id: "tse", title: "Public Datasets", subtitle: "Open data + references", x: 760, y: 110, w: 200, h: 84, color: C.source },
      ingest: { id: "ingest", title: "API + Python", subtitle: "Ingestion pipeline", x: 760, y: 390, w: 230, h: 88, color: C.ingestFlow },

      openai: { id: "openai", title: "OpenAI GPT-4o", subtitle: "Classify + summarize", x: 140, y: 620, w: 280, h: 72, color: C.backend },
      gemini: { id: "gemini", title: "Google Gemini", subtitle: "Multimodal analysis", x: 140, y: 720, w: 280, h: 72, color: C.backend },
      claude: { id: "claude", title: "Anthropic Claude", subtitle: "Long-context reasoning", x: 140, y: 820, w: 280, h: 72, color: C.backend },

      hub: { id: "hub", title: "n8n Orchestrator", subtitle: "Workflow engine + routing", x: 530, y: 700, w: 340, h: 96, color: C.backend, badge: "ACTIVE" },

      auth: { id: "auth", title: "Supabase Auth", subtitle: "JWT + RLS", x: 980, y: 620, w: 280, h: 72, color: C.backend },
      edge: { id: "edge", title: "Edge Functions", subtitle: "Deno API layer", x: 980, y: 720, w: 280, h: 72, color: C.backend },
      langfuse: { id: "langfuse", title: "Langfuse", subtitle: "Tracing + cost", x: 980, y: 820, w: 280, h: 72, color: C.backend },

      postgres: { id: "postgres", title: "PostgreSQL", subtitle: "Relational data", x: 505, y: 1080, w: 195, h: 72, color: C.data },
      redis: { id: "redis", title: "Redis", subtitle: "Session + memory", x: 720, y: 1080, w: 195, h: 72, color: C.data },
      pinecone: { id: "pinecone", title: "Pinecone", subtitle: "Vector retrieval", x: 935, y: 1080, w: 195, h: 72, color: C.data },
      r2: { id: "r2", title: "Cloudflare R2", subtitle: "Document storage", x: 1150, y: 1080, w: 195, h: 72, color: C.data },

      adminPortal: { id: "adminPortal", title: "Admin Portal", subtitle: "Tenants, roles, billing", x: 60, y: 1080, w: 240, h: 72, color: C.admin },
      ragControl: { id: "ragControl", title: "RAG Control", subtitle: "Uploads + namespaces", x: 60, y: 1170, w: 240, h: 72, color: C.admin },
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
          Map6 ONE
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
        viewBox="0 0 1400 1460"
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
        <marker id="arrLlm" markerWidth="5.5" markerHeight="5.5" refX="4.8" refY="2.75" orient="auto">
          <path d="M0 0 L5.5 2.75 L0 5.5 z" fill={C.llmFlow} />
        </marker>
      </defs>

      <style>{`text{font-family:${FONT}}`}</style>

      <rect x="0" y="0" width="1400" height="1460" fill={C.bg} />
      <rect x="0" y="0" width="1400" height="1460" fill="url(#dots)" opacity="0.45" />

      <rect x="40" y="35" width="640" height="280" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
      <text x="58" y="62" fontSize="12" fontWeight="800" fill={C.frontend} letterSpacing="1.4">FRONT-END</text>

      <rect x="740" y="55" width="560" height="260" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
      <text x="758" y="82" fontSize="12" fontWeight="800" fill={C.source} letterSpacing="1.4">EXTERNAL SOURCES</text>

      <rect x="120" y="560" width="1160" height="380" rx="14" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="138" y="587" fontSize="12" fontWeight="800" fill={C.backend} letterSpacing="1.4">INTELLIGENCE & ORCHESTRATION</text>
      <rect x="730" y="365" width="290" height="130" rx="12" fill="#ecfeff" stroke="#99f6e4" />
      <text x="748" y="387" fontSize="11" fontWeight="800" fill={C.ingestFlow} letterSpacing="1.2">INGESTION</text>

      <rect x="470" y="1040" width="900" height="140" rx="14" fill="#fffbeb" stroke="#fde68a" />
      <text x="488" y="1067" fontSize="12" fontWeight="800" fill={C.data} letterSpacing="1.4">DATA & STORAGE</text>

      <rect x="40" y="1040" width="280" height="230" rx="14" fill="#fef2f2" stroke="#fecaca" />
      <text x="58" y="1067" fontSize="12" fontWeight="800" fill={C.admin} letterSpacing="1.4">ADMIN</text>

      <g>
        <Link from={midRight(nodes.dashboard)} to={midLeft(nodes.edge)} color={C.flow} marker="arrFlow" width={3.2} label="api calls" highlighted={isConnectionHighlighted("dashboard", "edge", C.flow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.flow); }} />
        <Link from={midRight(nodes.modules)} to={midLeft(nodes.edge)} color={C.flow} marker="arrFlow" width={3.2} label="module data" highlighted={isConnectionHighlighted("modules", "edge", C.flow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.flow); }} />
        <Link from={midRight(nodes.assistant)} to={midLeft(nodes.edge)} color={C.assistantFlow} marker="arrAssist" width={3.2} label="assistant flow" highlighted={isConnectionHighlighted("assistant", "edge", C.assistantFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.assistantFlow); }} />

        <Link from={midBottom(nodes.tse)} to={midTop(nodes.ingest)} color={C.ingestFlow} marker="arrIngest" width={3.2} endDir="down" highlighted={isConnectionHighlighted("tse", "ingest", C.ingestFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.ingestFlow); }} />
        <Link from={midBottom(nodes.sprout)} to={midTop(nodes.ingest)} color={C.ingestFlow} marker="arrIngest" width={3.2} label="ingest" endDir="down" highlighted={isConnectionHighlighted("sprout", "ingest", C.ingestFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.ingestFlow); }} />
        <Link from={midBottom(nodes.ingest)} to={midTop(nodes.postgres)} color={C.ingestFlow} marker="arrIngest" width={3.4} endDir="down" highlighted={isConnectionHighlighted("ingest", "postgres", C.ingestFlow)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.ingestFlow); }} />
        <Link from={midBottom(nodes.notion)} to={midTop(nodes.hub)} color={C.pending} marker="arrPending" width={3} dash="8 6" label="notion sync" endDir="down" highlighted={isConnectionHighlighted("notion", "hub", C.pending)} onClick={(e) => { e.stopPropagation(); onSelectFlowColor(C.pending); }} />

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
      <Node n={nodes.sprout} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "sprout"} onSelectNode={onSelectNode} />
      <Node n={nodes.tse} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "tse"} onSelectNode={onSelectNode} />
      <Node n={nodes.notion} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "notion"} onSelectNode={onSelectNode} />
      <Node n={nodes.ingest} activeKey={activeKey} setActive={setActiveKey} setMouse={setMouse} isSelected={selectedNodeId === "ingest"} onSelectNode={onSelectNode} />

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

      <g transform="translate(1090, 1360)">
        <rect x="0" y="0" width="260" height="56" rx="10" fill={C.surface} stroke={C.border} />
        <path d="M16 16 H56" stroke={C.active} strokeWidth="3.5" markerEnd="url(#arrActive)" />
        <text x="66" y="20" fontSize="10" fill={C.sub}>Fluxo principal</text>
        <path d="M16 34 H56" stroke={C.pending} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#arrPending)" />
        <text x="66" y="38" fontSize="10" fill={C.sub}>Fluxo planejado</text>
      </g>

      {tip ? (
        <g pointerEvents="none">
          <rect x={Math.min(mouse.x + 12, 1080)} y={Math.min(mouse.y + 12, 930)} width="300" height="54" rx="9" fill={C.surface} stroke={C.border} />
          <text x={Math.min(mouse.x + 24, 1092)} y={Math.min(mouse.y + 32, 950)} fontSize="12" fontWeight="700" fill={C.text}>
            {tip[0]}
          </text>
          <text x={Math.min(mouse.x + 24, 1092)} y={Math.min(mouse.y + 48, 966)} fontSize="10.5" fill={C.sub}>
            {tip[1]}
          </text>
        </g>
      ) : null}
      </svg>
    </div>
  );
}
