'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/hooks/useOnboarding';

const INTEREST_TAGS = [
  { label: '创业', icon: '🚀', color: '#9c2627' },
  { label: '管理', icon: '📊', color: '#5b605c' },
  { label: '商业', icon: '💼', color: '#416757' },
  { label: '心理学', icon: '🧠', color: '#ad3332' },
  { label: '哲学', icon: '💭', color: '#5b605c' },
  { label: '自我成长', icon: '🌱', color: '#416757' },
  { label: '文学', icon: '📖', color: '#59615f' },
  { label: '小说', icon: '📚', color: '#9c2627' },
  { label: '武侠', icon: '⚔️', color: '#ad3332' },
  { label: '科幻', icon: '🛸', color: '#5b605c' },
  { label: '历史', icon: '🏛️', color: '#59615f' },
  { label: '传记', icon: '👤', color: '#757c7a' },
  { label: '科技', icon: '💻', color: '#416757' },
  { label: '健康', icon: '❤️', color: '#9c2627' },
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
      onAnimationComplete={() => {
        if (isExiting) onComplete();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: 'linear-gradient(165deg, #2d3432 0%, #1a2220 30%, #181e1c 60%, #2d3432 100%)',
      }}
    >
      {/* Ink wash background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-80 w-80 bg-[#ad3332]/10 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-[#5b605c]/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 bg-[#416757]/6 blur-[140px]" />
      </div>

      <div className="relative mx-4 w-full max-w-lg">
        {/* Progress - Vermilion gradient */}
        <div className="mb-10 flex items-center justify-center gap-2.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              style={{
                height: '4px',
                width: i === step ? '2.5rem' : '0.75rem',
                background: i <= step
                  ? 'linear-gradient(to right, #ad3332, #9c2627)'
                  : 'rgba(255,255,255,0.12)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepCard key="step0">
              <h2
                className="mb-3 text-center text-2xl font-bold tracking-tight text-white md:text-3xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
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
                      className="flex items-center gap-1.5 text-sm font-medium"
                      style={{
                        padding: '0.625rem 1.125rem',
                        background: selected ? tag.color : 'rgba(255,255,255,0.07)',
                        color: selected ? 'white' : 'rgba(255,255,255,0.65)',
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
                  style={{ fontFamily: 'var(--font-label)' }}
                >
                  已选择 {answers.interests.length} 个分类
                </motion.p>
              )}
            </StepCard>
          )}

          {step === 1 && (
            <StepCard key="step1">
              <h2
                className="mb-3 text-center text-2xl font-bold tracking-tight text-white md:text-3xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
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
                        padding: '1.5rem 1rem',
                        background: selected
                          ? 'rgba(173, 51, 50, 0.25)'
                          : 'rgba(255,255,255,0.04)',
                        transform: selected ? 'scale(1.02)' : 'scale(1)',
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
              <h2
                className="mb-3 text-center text-2xl font-bold tracking-tight text-white md:text-3xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
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
                        padding: '1.125rem 1.25rem',
                        background: selected
                          ? 'rgba(173, 51, 50, 0.25)'
                          : 'rgba(255,255,255,0.04)',
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
                          className="ml-auto"
                          style={{ color: '#9c2627' }}
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

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={prevStep}
              className="px-6 py-2.5 text-sm font-medium text-white/50"
              style={{
                background: 'rgba(255,255,255,0.04)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              返回
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-6 py-2.5 text-sm text-white/35"
              style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
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
                background: canProceed()
                  ? 'linear-gradient(135deg, #ad3332, #9c2627)'
                  : 'rgba(173, 51, 50, 0.3)',
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
                background: canProceed()
                  ? 'linear-gradient(135deg, #ad3332, #9c2627)'
                  : 'rgba(173, 51, 50, 0.3)',
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
