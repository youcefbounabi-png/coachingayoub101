import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            // Check if device has no fine pointer OR viewport is mobile-sized
            const hasNoFinePointer = !window.matchMedia('(pointer: fine)').matches;
            const isMobileViewport = window.innerWidth < 768;
            setIsMobile(hasNoFinePointer || isMobileViewport);
        };

        checkMobile();

        // Re-check on resize for DevTools emulation
        window.addEventListener('resize', checkMobile);

        if (isMobile) {
            return () => {
                window.removeEventListener('resize', checkMobile);
            };
        }
        const updateCursorPosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if target is clickable/interactive
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
    }, [isMobile]);

    if (isMobile || !visible) return null;

    return (
        <div
            className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        />
    );
};

export default CustomCursor;
