'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/hooks/useOnboarding';

// 兴趣标签数据
const INTEREST_TAGS = [
  { label: '创业', icon: '🚀', color: 'from-orange-400 to-red-500' },
  { label: '管理', icon: '📊', color: 'from-blue-400 to-blue-600' },
  { label: '商业', icon: '💼', color: 'from-cyan-400 to-blue-500' },
  { label: '心理学', icon: '🧠', color: 'from-purple-400 to-purple-600' },
  { label: '哲学', icon: '💭', color: 'from-indigo-400 to-indigo-600' },
  { label: '自我成长', icon: '🌱', color: 'from-green-400 to-emerald-500' },
  { label: '文学', icon: '📖', color: 'from-amber-600 to-yellow-700' },
  { label: '小说', icon: '📚', color: 'from-pink-400 to-rose-500' },
  { label: '武侠', icon: '⚔️', color: 'from-red-500 to-orange-600' },
  { label: '科幻', icon: '🛸', color: 'from-violet-500 to-purple-600' },
  { label: '历史', icon: '🏛️', color: 'from-amber-700 to-yellow-800' },
  { label: '传记', icon: '👤', color: 'from-slate-500 to-gray-600' },
  { label: '科技', icon: '💻', color: 'from-teal-400 to-cyan-500' },
  { label: '健康', icon: '❤️', color: 'from-red-400 to-pink-500' },
];

const READING_GOALS = [
  { label: '拓展视野', desc: '了解更多领域的知识', icon: '🌍' },
  { label: '提升能力', desc: '学习实用技能和方法', icon: '💪' },
  { label: '享受故事', desc: '沉浸在精彩的故事中', icon: '✨' },
  { label: '寻找答案', desc: '解决当下的困惑', icon: '🔍' },
];

const STYLE_PREFERENCES = [
  { label: '深度解读', desc: '详细的分析和思考', icon: '🎯' },
  { label: '轻松速读', desc: '快速获取核心要点', icon: '⚡' },
  { label: '实战干货', desc: '可以直接应用的方法', icon: '🔧' },
  { label: '思维导图', desc: '结构化的知识框架', icon: '🗺️' },
];

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const {
    answers,
    step,
    toggleInterest,
    saveAnswers,
    nextStep,
    prevStep,
    complete,
  } = useOnboarding();

  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = () => {
    complete();
    setIsExiting(true);
    setTimeout(onComplete, 500);
  };

  const canProceed = () => {
    if (step === 0) return answers.interests.length >= 2;
    if (step === 1) return !!answers.readingGoal;
    if (step === 2) return !!answers.preferredStyle;
    return true;
  };

  const totalSteps = 3;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: 'linear-gradient(165deg, #0c1222 0%, #141830 30%, #1a1a2e 60%, #0f172a 100%)',
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-purple-500/15 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/8 blur-[140px]" />
        <div className="absolute right-1/4 top-1/4 h-48 w-48 rounded-full bg-cyan-500/6 blur-[80px]" />
      </div>

      <div className="relative mx-4 w-full max-w-lg">
        {/* Progress bar */}
        <div className="mb-10 flex items-center justify-center gap-2.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                height: '4px',
                width: i === step ? '2.5rem' : '0.75rem',
                background: i <= step
                  ? 'linear-gradient(to right, #a855f7, #ec4899)'
                  : 'rgba(255,255,255,0.12)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: i <= step ? '0 0 12px rgba(168, 85, 247, 0.4)' : 'none',
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepCard key="step0">
              <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
                Hi! 你对什么感兴趣？
              </h2>
              <p className="mb-8 text-center text-sm text-white/45">
                选择 2 个以上，我们来为你定制书单
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {INTEREST_TAGS.map((tag) => {
                  const selected = answers.interests.includes(tag.label);
                  return (
                    <button
                      key={tag.label}
                      onClick={() => toggleInterest(tag.label)}
                      className={`flex items-center gap-1.5 text-sm font-medium ${
                        selected
                          ? `bg-gradient-to-r ${tag.color} text-white shadow-lg`
                          : 'text-white/65 hover:text-white'
                      }`}
                      style={{
                        borderRadius: 'var(--radius-2xl)',
                        padding: '0.625rem 1.125rem',
                        background: selected ? undefined : 'rgba(255,255,255,0.07)',
                        border: selected
                          ? '1px solid rgba(255,255,255,0.2)'
                          : '1px solid rgba(255,255,255,0.08)',
                        transform: selected ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span className="text-base">{tag.icon}</span>
                      <span>{tag.label}</span>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-0.5 text-xs"
                        >
                          ✓
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>

              {answers.interests.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 text-center text-xs text-white/35"
                >
                  已选择 {answers.interests.length} 个分类
                </motion.p>
              )}
            </StepCard>
          )}

          {step === 1 && (
            <StepCard key="step1">
              <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
                你读书的目标是？
              </h2>
              <p className="mb-8 text-center text-sm text-white/45">
                选一个最符合你当下状态的
              </p>

              <div className="grid grid-cols-2 gap-3.5">
                {READING_GOALS.map((goal) => {
                  const selected = answers.readingGoal === goal.label;
                  return (
                    <button
                      key={goal.label}
                      onClick={() => saveAnswers({ readingGoal: goal.label })}
                      className="flex flex-col items-center gap-2.5 text-center"
                      style={{
                        borderRadius: 'var(--radius-xl)',
                        padding: '1.5rem 1rem',
                        background: selected
                          ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(236, 72, 153, 0.15))'
                          : 'rgba(255,255,255,0.04)',
                        border: selected
                          ? '1.5px solid rgba(168, 85, 247, 0.5)'
                          : '1px solid rgba(255,255,255,0.06)',
                        transform: selected ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: selected ? '0 8px 32px rgba(168, 85, 247, 0.15)' : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span className="text-3xl">{goal.icon}</span>
                      <span className="text-sm font-semibold text-white">
                        {goal.label}
                      </span>
                      <span className="text-xs text-white/45">{goal.desc}</span>
                    </button>
                  );
                })}
              </div>
            </StepCard>
          )}

          {step === 2 && (
            <StepCard key="step2">
              <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-white md:text-3xl">
                你喜欢什么阅读风格？
              </h2>
              <p className="mb-8 text-center text-sm text-white/45">
                我们会根据你的偏好调整内容呈现方式
              </p>

              <div className="space-y-3">
                {STYLE_PREFERENCES.map((style) => {
                  const selected = answers.preferredStyle === style.label;
                  return (
                    <button
                      key={style.label}
                      onClick={() => saveAnswers({ preferredStyle: style.label })}
                      className="flex w-full items-center gap-4 text-left"
                      style={{
                        borderRadius: 'var(--radius-xl)',
                        padding: '1.125rem 1.25rem',
                        background: selected
                          ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(236, 72, 153, 0.12))'
                          : 'rgba(255,255,255,0.04)',
                        border: selected
                          ? '1.5px solid rgba(168, 85, 247, 0.5)'
                          : '1px solid rgba(255,255,255,0.06)',
                        boxShadow: selected ? '0 8px 32px rgba(168, 85, 247, 0.12)' : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span className="text-2xl">{style.icon}</span>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-white">
                          {style.label}
                        </span>
                        <p className="text-xs text-white/45">{style.desc}</p>
                      </div>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-purple-400"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>
            </StepCard>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={prevStep}
              className="px-6 py-2.5 text-sm font-medium text-white/50"
              style={{
                borderRadius: 'var(--radius-2xl)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              返回
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-6 py-2.5 text-sm text-white/35"
              style={{
                borderRadius: 'var(--radius-2xl)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              跳过
            </button>
          )}

          {step < totalSteps - 1 ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="px-8 py-2.5 text-sm font-semibold text-white disabled:opacity-25"
              style={{
                borderRadius: 'var(--radius-2xl)',
                background: canProceed()
                  ? 'linear-gradient(135deg, #a855f7, #ec4899)'
                  : 'rgba(168, 85, 247, 0.3)',
                boxShadow: canProceed()
                  ? '0 8px 24px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)'
                  : 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              继续
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!canProceed()}
              className="px-8 py-2.5 text-sm font-semibold text-white disabled:opacity-25"
              style={{
                borderRadius: 'var(--radius-2xl)',
                background: canProceed()
                  ? 'linear-gradient(135deg, #a855f7, #ec4899)'
                  : 'rgba(168, 85, 247, 0.3)',
                boxShadow: canProceed()
                  ? '0 8px 24px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)'
                  : 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              开始探索
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// 步骤卡片动画容器
function StepCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -50, filter: 'blur(4px)' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
