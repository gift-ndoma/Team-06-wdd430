'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { aboutConfig } from './config';
import styles from './styles.module.css';

export default function AboutPage() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const config = aboutConfig;

  return (
    <div className={styles.aboutPage}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className={styles.heroLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {config.hero.label}
          </motion.span>

          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {config.hero.title}
          </motion.h1>

          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {config.hero.subtitle}
          </motion.p>

          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {config.hero.buttons.map((btn) => (
              <a
                key={btn.text}
                href={btn.link}
                className={`${styles.btn} ${btn.primary ? styles.btnPrimary : styles.btnSecondary}`}
              >
                {btn.text}
              </a>
            ))}
          </motion.div>
        </motion.div>
        
        <div className={styles.heroDecoration}>
          <div className={`${styles.decorationCircle} ${styles.circle1}`}></div>
          <div className={`${styles.decorationCircle} ${styles.circle2}`}></div>
          <div className={`${styles.decorationCircle} ${styles.circle3}`}></div>
        </div>
      </section>

      {/* ===== QUICK LINKS ===== */}
      <section className={styles.quickLinks}>
        <div className={styles.container}>
          <div className={styles.quickLinksGrid}>
            {config.quickLinks.map((link, i) => (
              <motion.a
                key={link.title}
                href={link.link}
                className={styles.quickLinkCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <span className={styles.quickLinkIcon}>{link.icon}</span>
                <h3>{link.title}</h3>
                <p>{link.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISION SECTION ===== */}
      <section className={`${styles.section} ${styles.visionSection}`}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.sectionLabel}>{config.vision.label}</span>
            <h2 className={styles.sectionTitle}>{config.vision.title}</h2>
            <p className={styles.visionText}>{config.vision.text}</p>
          </motion.div>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className={`${styles.section} ${styles.valuesSection}`}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionLabel}>Our Values</span>
            <h2 className={styles.sectionTitle}>What drives us forward</h2>
          </motion.div>
          
          <div className={styles.valuesGrid}>
            {config.values.map((value, i) => (
              <motion.div
                key={value.title}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onHoverStart={() => setHoveredValue(i)}
                onHoverEnd={() => setHoveredValue(null)}
                whileHover={{ y: -10 }}
              >
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
                <div className={`${styles.valueGlow} ${hoveredValue === i ? 'active' : ''}`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section className={`${styles.section} ${styles.trustedBy}`}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionLabel}>Trusted By</span>
            <h2 className={styles.sectionTitle}>Building community together</h2>
          </motion.div>
          
          <div className={styles.trustedGrid}>
            {config.trustedBy.map((item, i) => (
              <motion.div
                key={item}
                className={styles.trustedBadge}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className={styles.badgeCheck}>✓</span>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {config.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statCard}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPOTLIGHT ===== */}
      <section className={`${styles.section} ${styles.spotlightSection}`}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionLabel}>In The Spotlight</span>
            <h2 className={styles.sectionTitle}>Discover trending collections</h2>
          </motion.div>
          
          <div className={styles.spotlightGrid}>
            {config.spotlight.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.link}
                className={styles.spotlightCard}
                style={{ background: item.color }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className={styles.spotlightImage}>{item.icon}</div>
                <h3>{item.title}</h3>
                <span className={styles.spotlightArrow}>→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className={`${styles.section} ${styles.teamSection}`}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionLabel}>Leadership</span>
            <h2 className={styles.sectionTitle}>Meet our team</h2>
            <p className={styles.sectionSubtitle}>
              Passionate leaders dedicated to empowering artisans and celebrating craftsmanship
            </p>
          </motion.div>
          
          <div className={styles.teamGrid}>
            {config.team.map((member, i) => (
              <motion.div
                key={member.name}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div 
                  className={styles.teamAvatar} 
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY ===== */}
      <section className={`${styles.section} ${styles.communitySection}`}>
        <div className={styles.container}>
          <motion.div
            className={styles.communityContent}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.sectionLabel}>Our Community</span>
            <h2 className={styles.sectionTitle}>Join a movement of makers and supporters</h2>
            <p className={styles.communityText}>
              We're building a growing community of artisans and customers who value originality, 
              culture, and creativity. From pottery workshops to seasonal craft fairs, we create 
              spaces where makers connect with customers, share knowledge, and celebrate the 
              beauty of handmade artistry. Together, we're preserving traditional crafts while 
              embracing modern innovation.
            </p>
            <div className={styles.communityStats}>
              {config.community.stats.map((stat, i) => (
                <div key={i} className={styles.communityStat}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statInfo}>
                    <strong>{stat.title}</strong>
                    <span>{stat.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <motion.div 
          className={styles.ctaContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>{config.cta.title}</h2>
          <p>{config.cta.subtitle}</p>
          <div className={styles.ctaButtons}>
            {config.cta.buttons.map((btn) => (
              <a
                key={btn.text}
                href={btn.link}
                className={`${styles.btn} ${btn.primary ? styles.btnPrimary : styles.btnSecondary} ${styles.btnLarge}`}
              >
                {btn.text}
              </a>
            ))}
          </div>
        </motion.div>
        
        <div className={styles.ctaDecoration}>
          <div className={`${styles.floatingShape} ${styles.shape1}`}></div>
          <div className={`${styles.floatingShape} ${styles.shape2}`}></div>
          <div className={`${styles.floatingShape} ${styles.shape3}`}></div>
        </div>
      </section>
    </div>
  );
}
