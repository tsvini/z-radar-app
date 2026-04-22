"use client";

const upcomingModules = [
  {
    title: "Análise com IA",
    description:
      "Geração de resumos executivos, diagnósticos e recomendações a partir dos resultados da auditoria.",
  },
  {
    title: "Histórico de execuções",
    description:
      "Visualização consolidada das execuções anteriores, evolução dos indicadores e rastreabilidade.",
  },
  {
    title: "Pendências por responsável",
    description:
      "Distribuição das pendências identificadas por responsável, com foco em criticidade e priorização.",
  },
  {
    title: "Alertas automáticos",
    description:
      "Notificações inteligentes para alterações críticas, degradação da saúde documental e necessidade de ação.",
  },
  {
    title: "Insights executivos",
    description:
      "Visão gerencial com leitura consolidada da saúde documental, tendências e pontos de atenção.",
  },
  {
    title: "Configurações de rotas",
    description:
      "Gestão de projetos, rotas monitoradas, responsáveis e parâmetros operacionais do Z-Radar.",
  },
];

const quickStats = [
  { label: "Saúde geral", value: "76%", accent: "text-[#12f276]" },
  { label: "Itens críticos", value: "6", accent: "text-[#fca5a5]" },
  { label: "Documentos auditados", value: "41", accent: "text-white" },
  { label: "Última execução", value: "Hoje", accent: "text-slate-200" },
];

const sidebarItems = [
  "Dashboard",
  "Auditoria documental",
  "Histórico",
  "Pendências",
  "Insights",
  "Configurações",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050811] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 aurora-bg" />
        <div className="absolute left-[-10%] top-[8%] h-[340px] w-[340px] rounded-full bg-[rgba(18,242,118,0.16)] blur-[120px]" />
        <div className="absolute right-[-8%] top-[12%] h-[320px] w-[320px] rounded-full bg-[rgba(14,165,233,0.14)] blur-[120px]" />
        <div className="absolute bottom-[-8%] left-[35%] h-[280px] w-[280px] rounded-full bg-[rgba(18,242,118,0.12)] blur-[120px]" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-5 md:px-6">
        <aside className="hidden xl:flex w-[280px] shrink-0 flex-col rounded-[28px] border border-[rgba(18,242,118,0.12)] bg-[rgba(8,12,25,0.82)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex items-center gap-4 rounded-[22px] border border-[rgba(18,242,118,0.14)] bg-[rgba(255,255,255,0.03)] p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(18,242,118,0.22)] bg-[linear-gradient(135deg,rgba(18,242,118,0.16),rgba(18,242,118,0.04))] shadow-[0_0_35px_rgba(18,242,118,0.18)]">
              <span className="text-3xl font-black text-[#19f67d] drop-shadow-[0_0_12px_rgba(18,242,118,0.25)]">
                Z
              </span>
            </div>

            <div>
              <div className="text-xl font-extrabold">Z-Radar</div>
              <div className="text-sm text-slate-400">Plataforma operacional</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              Navegação
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={item}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    index === 0
                      ? "border border-[rgba(18,242,118,0.18)] bg-[rgba(18,242,118,0.08)] text-white"
                      : "border border-transparent bg-[rgba(255,255,255,0.02)] text-slate-300 hover:border-[rgba(18,242,118,0.12)] hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      index === 0 ? "bg-[#12f276]" : "bg-slate-600"
                    }`}
                  />
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
              Módulo ativo
            </div>
            <div className="mt-3 text-lg font-bold">Auditoria documental</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              O fluxo atual já está operacional e serve como base visual e técnica
              para os próximos módulos.
            </p>
          </div>

          <div className="mt-auto rounded-[22px] border border-[rgba(18,242,118,0.12)] bg-[rgba(18,242,118,0.05)] p-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#12f276]">
              Próximo passo
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Integrar os cards reais, histórico, IA e ações operacionais no mesmo
              layout.
            </p>
          </div>
        </aside>

        <div className="flex-1">
          <section className="overflow-hidden rounded-[30px] border border-[rgba(18,242,118,0.14)] bg-[rgba(10,15,31,0.82)] shadow-[0_32px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(18,242,118,0.45)] to-transparent" />

            <div className="p-6 md:p-8 xl:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(18,242,118,0.18)] bg-[rgba(18,242,118,0.08)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#12f276]">
                <span>✦</span>
                <span>Z-Radar Platform</span>
              </div>

              <div className="mt-6 flex flex-col gap-8 2xl:flex-row 2xl:items-center 2xl:justify-between">
                <div className="max-w-4xl">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-[rgba(18,242,118,0.22)] bg-[linear-gradient(135deg,rgba(18,242,118,0.16),rgba(18,242,118,0.04))] shadow-[0_0_35px_rgba(18,242,118,0.18)]">
                      <span className="text-[34px] font-black text-[#19f67d] drop-shadow-[0_0_12px_rgba(18,242,118,0.25)]">
                        Z
                      </span>
                    </div>

                    <div>
                      <div className="bg-[linear-gradient(135deg,#12f276,#3fff9f)] bg-clip-text text-[22px] font-bold text-transparent md:text-[28px]">
                        Z-Radar
                      </div>
                      <div className="text-sm text-slate-400">
                        Painel central de auditoria e monitoramento documental
                      </div>
                    </div>
                  </div>

                  <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl xl:text-6xl">
                    Uma visão central do que já existe
                    <span className="mt-2 block font-semibold text-slate-300">
                      e do que está chegando no produto.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-3xl text-[16px] leading-8 text-slate-400 md:text-[17px]">
                    O Z-Radar consolida a auditoria documental em uma experiência
                    única, com espaço para evolução contínua em IA, histórico,
                    pendências operacionais e monitoramento inteligente.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="inline-flex items-center rounded-full border border-[rgba(18,242,118,0.18)] bg-[rgba(18,242,118,0.08)] px-4 py-2 text-sm font-semibold text-[#dfffea]">
                      Módulo ativo: Auditoria documental
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-medium text-slate-300">
                      Roadmap em construção
                    </span>
                  </div>
                </div>

                <div className="w-full max-w-md">
                  <div className="rounded-[26px] border border-[rgba(18,242,118,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                    <div className="text-sm font-bold uppercase tracking-[0.08em] text-[#12f276]">
                      Estado atual
                    </div>
                    <div className="mt-3 text-2xl font-bold text-white">
                      Plataforma em evolução
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      A auditoria documental já está operacional. Os demais módulos
                      serão adicionados na mesma experiência, preservando
                      consistência visual e escalabilidade do produto.
                    </p>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                      <div className="h-full w-[28%] rounded-full bg-[linear-gradient(90deg,#18d26f,#9df7c2,#18d26f)]" />
                    </div>

                    <div className="mt-3 text-xs font-medium text-slate-400">
                      Estrutura inicial do produto pronta
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-[rgba(18,242,118,0.12)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_12px_34px_rgba(0,0,0,0.22)]"
              >
                <div className="text-xs font-bold uppercase tracking-[0.08em] text-slate-400">
                  {item.label}
                </div>
                <div className={`mt-3 text-4xl font-extrabold ${item.accent}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </section>

          <section className="mt-10">
            <div className="mb-5">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Módulo disponível
              </h2>
              <p className="mt-1 text-slate-400">
                O primeiro componente funcional da plataforma.
              </p>
            </div>

            <div className="rounded-[28px] border border-[rgba(18,242,118,0.16)] bg-[rgba(10,15,31,0.78)] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center rounded-full border border-[rgba(18,242,118,0.22)] bg-[rgba(18,242,118,0.08)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#12f276]">
                    Ativo
                  </div>

                  <h3 className="mt-4 text-3xl font-bold text-white">
                    Auditoria documental
                  </h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    Validação automatizada da saúde da documentação, com leitura de
                    criticidade, itens desatualizados, geração de relatórios e
                    acionamento do fluxo operacional já existente.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="min-w-[200px] rounded-2xl bg-[linear-gradient(135deg,#12f276_0%,#0dd65e_100%)] px-6 py-3.5 font-extrabold text-[#050811] shadow-[0_16px_40px_rgba(18,242,118,0.25)] transition hover:-translate-y-[2px]">
                      Acessar módulo
                    </button>

                    <button className="min-w-[180px] rounded-2xl border border-[rgba(18,242,118,0.2)] bg-[rgba(255,255,255,0.04)] px-6 py-3.5 font-bold text-white transition hover:bg-[rgba(18,242,118,0.08)]">
                      Ver roadmap
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-sm">
                  <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.08em] text-slate-400">
                      Capacidade atual
                    </div>
                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                      <li>✓ Auditoria documental</li>
                      <li>✓ Classificação de criticidade</li>
                      <li>✓ Relatório operacional</li>
                      <li>✓ Integração com fluxo existente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 pb-8">
            <div className="mb-5">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Próximos módulos
              </h2>
              <p className="mt-1 text-slate-400">
                Estrutura visual do produto já preparada para expansão.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {upcomingModules.map((module) => (
                <div
                  key={module.title}
                  className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition hover:-translate-y-[2px] hover:border-[rgba(18,242,118,0.12)]"
                >
                  <div className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-300">
                    Em breve
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white">
                    {module.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {module.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <style jsx global>{`
        .aurora-bg {
          background:
            radial-gradient(ellipse at 20% 30%, rgba(18, 242, 118, 0.2) 0%, transparent 25%),
            radial-gradient(ellipse at 80% 20%, rgba(14, 165, 233, 0.16) 0%, transparent 20%),
            radial-gradient(ellipse at 50% 100%, rgba(18, 242, 118, 0.12) 0%, transparent 35%),
            linear-gradient(135deg, #050811 0%, #0a0f1f 50%, #050811 100%);
          background-size: 400% 400%, 300% 300%, 350% 350%, 100% 100%;
          animation: auroraFlow 20s ease-in-out infinite;
        }

        .aurora-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.02) 0px,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.02) 0px,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px,
              transparent 2px
            );
          background-size: 50px 50px;
          opacity: 0.35;
          animation: grainShift 8s linear infinite;
        }

        @keyframes auroraFlow {
          0%,
          100% {
            background-position: 0% 50%, 100% 50%, 0% 50%, 0% 0%;
          }
          25% {
            background-position: 50% 30%, 50% 60%, 30% 40%, 0% 0%;
          }
          50% {
            background-position: 100% 50%, 0% 50%, 100% 50%, 0% 0%;
          }
          75% {
            background-position: 50% 70%, 50% 40%, 70% 60%, 0% 0%;
          }
        }

        @keyframes grainShift {
          0% {
            background-position: 0 0, 0 0;
          }
          100% {
            background-position: 100px 100px, 100px 100px;
          }
        }
      `}</style>
    </main>
  );
}