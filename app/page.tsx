"use client";

export default function Home() {
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

  return (
    <main className="min-h-screen bg-[#050811] text-white relative overflow-hidden">
      <div className="aurora-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <section className="rounded-[28px] border border-[rgba(18,242,118,0.15)] bg-[rgba(10,15,31,0.82)] backdrop-blur-xl shadow-[0_32px_120px_rgba(0,0,0,0.45)] overflow-hidden">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(18,242,118,0.45)] to-transparent" />

          <div className="p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(18,242,118,0.18)] bg-[rgba(18,242,118,0.08)] px-4 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#12f276]">
              <span>✦</span>
              <span>Z-Radar Platform</span>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl border border-[rgba(18,242,118,0.22)] bg-[linear-gradient(135deg,rgba(18,242,118,0.16),rgba(18,242,118,0.04))] shadow-[0_0_35px_rgba(18,242,118,0.18)] flex items-center justify-center">
                    <span className="text-[#19f67d] text-3xl font-black drop-shadow-[0_0_12px_rgba(18,242,118,0.25)]">
                      Z
                    </span>
                  </div>

                  <div>
                    <div className="text-[22px] md:text-[26px] font-bold bg-[linear-gradient(135deg,#12f276,#3fff9f)] bg-clip-text text-transparent">
                      Z-Radar
                    </div>
                    <div className="text-sm text-slate-400">
                      Painel central de auditoria e monitoramento documental
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Uma visão central do que já existe
                  <span className="block text-slate-300 font-semibold mt-2">
                    e do que está chegando no produto.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-[16px] leading-7 text-slate-400">
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

              <div className="w-full max-w-sm">
                <div className="rounded-[24px] border border-[rgba(18,242,118,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                  <div className="text-sm uppercase tracking-[0.08em] text-[#12f276] font-bold">
                    Estado atual
                  </div>
                  <div className="mt-3 text-2xl font-bold text-white">
                    Plataforma em evolução
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    A auditoria documental já está operacional. Os demais
                    módulos serão adicionados na mesma experiência, preservando
                    consistência visual e escalabilidade do produto.
                  </p>

                  <div className="mt-5 h-2 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                    <div className="h-full w-[28%] rounded-full bg-[linear-gradient(90deg,#18d26f,#9df7c2,#18d26f)]" />
                  </div>
                  <div className="mt-3 text-xs text-slate-400 font-medium">
                    Estrutura inicial do produto pronta
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            { label: "Saúde geral", value: "76%", accent: "text-[#12f276]" },
            { label: "Itens críticos", value: "6", accent: "text-[#fca5a5]" },
            { label: "Documentos auditados", value: "41", accent: "text-white" },
            { label: "Última execução", value: "Hoje", accent: "text-slate-200" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[22px] border border-[rgba(18,242,118,0.12)] bg-[rgba(255,255,255,0.03)] p-5 shadow-[0_12px_34px_rgba(0,0,0,0.22)]"
            >
              <div className="text-xs uppercase tracking-[0.08em] text-slate-400 font-bold">
                {item.label}
              </div>
              <div className={`mt-3 text-3xl font-extrabold ${item.accent}`}>
                {item.value}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Módulo disponível
              </h2>
              <p className="text-slate-400 mt-1">
                O primeiro componente funcional da plataforma.
              </p>
            </div>
          </div>

          <div className="rounded-[26px] border border-[rgba(18,242,118,0.16)] bg-[rgba(10,15,31,0.78)] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-[rgba(18,242,118,0.22)] bg-[rgba(18,242,118,0.08)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#12f276]">
                  Ativo
                </div>

                <h3 className="mt-4 text-3xl font-bold text-white">
                  Auditoria documental
                </h3>

                <p className="mt-3 text-slate-400 leading-7">
                  Validação automatizada da saúde da documentação, com leitura
                  de criticidade, itens desatualizados, geração de relatórios e
                  acionamento do fluxo operacional já existente.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="min-w-[200px] rounded-2xl px-6 py-3.5 font-extrabold text-[#050811] bg-[linear-gradient(135deg,#12f276_0%,#0dd65e_100%)] shadow-[0_16px_40px_rgba(18,242,118,0.25)] transition hover:-translate-y-[2px]">
                    Acessar módulo
                  </button>

                  <button className="min-w-[180px] rounded-2xl px-6 py-3.5 font-bold text-white border border-[rgba(18,242,118,0.2)] bg-[rgba(255,255,255,0.04)] transition hover:bg-[rgba(18,242,118,0.08)]">
                    Ver roadmap
                  </button>
                </div>
              </div>

              <div className="w-full max-w-sm">
                <div className="rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5">
                  <div className="text-xs uppercase tracking-[0.08em] text-slate-400 font-bold">
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

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold tracking-tight">
              Próximos módulos
            </h2>
            <p className="text-slate-400 mt-1">
              Estrutura visual do produto já preparada para expansão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {upcomingModules.map((module) => (
              <div
                key={module.title}
                className="rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
              >
                <div className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-300">
                  Em breve
                </div>

                <h3 className="mt-4 text-xl font-bold text-white">
                  {module.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .aurora-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 20% 30%, rgba(18, 242, 118, 0.22) 0%, transparent 25%),
            radial-gradient(ellipse at 80% 20%, rgba(14, 165, 233, 0.18) 0%, transparent 20%),
            radial-gradient(ellipse at 50% 100%, rgba(18, 242, 118, 0.14) 0%, transparent 35%),
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
              rgba(255, 255, 255, 0.025) 0px,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 0px,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px,
              transparent 2px
            );
          background-size: 50px 50px;
          opacity: 0.4;
          animation: grainShift 8s linear infinite;
        }

        @keyframes auroraFlow {
          0%, 100% {
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