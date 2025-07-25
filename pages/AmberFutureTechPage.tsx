
import React, { useState, useEffect } from 'react';
import SectionDivider from '../components/SectionDivider';
import SEO from '../components/SEO';
import { BACKGROUND_IMAGES } from '../constants';

const ImageWithAlt: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = 'aspect-video' }) => (
    <div className={`w-full bg-[var(--c-surface-alt)] rounded-lg flex items-center justify-center my-6 overflow-hidden ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover"/>
    </div>
);

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 bg-[var(--c-accent-primary)] text-white p-3 rounded-full shadow-lg transition-all duration-300 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
            aria-label="Go to top"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

const AmberFutureTechPage: React.FC = () => {
    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[21]}')`}}
        >
             <SEO
                titleKey="seo_amber_future_tech_title"
                descriptionKey="seo_amber_future_tech_desc"
                keywordsKey="seo_amber_future_tech_keywords"
                imageUrl="https://i.postimg.cc/L6z7JpCp/Vicky-Amber-Gems-background-0023.jpg"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tight">Future Tech & Amber</h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]">Innovation Meets Ancient History</p>
                    </div>

                    <div className="mt-12 prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
                        <h2>Enhancing Value and Transparency</h2>
                        <SectionDivider/>
                        <div className="space-y-4">
                            <p>Technology is revolutionizing how we interact with amber. High-resolution CT scanning allows scientists to create detailed 3D models of inclusions without damaging the specimen. This enhances both its scientific and market value.</p>
                            <p>Furthermore, technologies like blockchain may be used in the future to create immutable records of an amber piece's provenance, from the mine to the final owner, ensuring authenticity and ethical sourcing transparency in a way never before possible.</p>
                        </div>
                        <div className="not-prose">
                           <ImageWithAlt src="https://placehold.co/800x450/9FB8AD/FFFFFF?text=CT+Scan+of+Amber" alt="A 3D model of an insect inclusion within a piece of amber, generated by a CT scanner." />
                        </div>
                    </div>
                </div>
            </div>
            <BackToTopButton />
        </div>
    );
};

export default AmberFutureTechPage;
