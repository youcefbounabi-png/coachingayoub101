import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const hasNoFinePointer = !window.matchMedia('(pointer: fine)').matches;
            const isMobileViewport = window.innerWidth < 768;
            setIsMobile(hasNoFinePointer || isMobileViewport);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const updateCursorPosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';
            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', updateCursorPosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    if (isMobile || !visible) return null;

    return (
        <div
            className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        />
    );
};

export default CustomCursor;
