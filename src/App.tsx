import { useEffect, useMemo, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DayNightShader from './sections/DayNightShader';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import ExhibitionIndex from './sections/ExhibitionIndex';
import ExhibitionDetail from './sections/ExhibitionDetail';
import CinematicPavilions from './sections/CinematicPavilions';
import GravityScene from './sections/GravityScene';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import { siteConfig } from './config';
import { getExhibitionBySlug } from './lib/exhibitions';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const dayNightProgress = useRef(0);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);

    const handlePopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    document.title = siteConfig.siteTitle || '';
    document.documentElement.lang = siteConfig.language || '';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription || '';
  }, []);

  const activeExhibition = useMemo(() => {
    const match = pathname.match(/^\/exhibitions\/([^/]+)$/);
    if (!match) return null;
    return getExhibitionBySlug(match[1]);
  }, [pathname]);

  const navigateToExhibition = (slug: string) => {
    const nextPath = `/exhibitions/${slug}`;
    window.history.pushState({}, '', nextPath);
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateToArchive = () => {
    window.history.pushState({}, '', '/');
    setPathname('/');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (pathname.startsWith('/exhibitions/') && activeExhibition) {
    return (
      <>
        <CustomCursor />
        <ExhibitionDetail exhibition={activeExhibition} onBack={navigateToArchive} />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <ScrollProgress dayNightProgress={dayNightProgress} />

      {/* Hero with Day/Night Shader Background */}
      <div style={{ position: 'relative', height: '100vh' }}>
        <DayNightShader dayNightProgress={dayNightProgress} />
        <Hero />
      </div>

      {/* About / Manifesto */}
      <div id="about">
        <Manifesto />
      </div>

      {/* Experience Index */}
      <div id="experience">
        <ExhibitionIndex onSelect={navigateToExhibition} />
      </div>

      {/* Featured Projects */}
      <div id="projects">
        <Projects />
      </div>

      {/* Skills with 3D Gravity Scene */}
      <div id="skills">
        <CinematicPavilions />
        <GravityScene dayNightProgress={dayNightProgress} />
      </div>

      {/* Education */}
      <Education />

      {/* Footer / Contact */}
      <Footer />
    </>
  );
}
