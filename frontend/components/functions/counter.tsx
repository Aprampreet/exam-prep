'use client';

import { useRef, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue, useInView } from "framer-motion";

export default function Counter({ value, suffix = "", decimals = 0 }: { value: number, suffix?: string, decimals?: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 100,
        damping: 30,
        duration: 2
    });
    const display = useTransform(springValue, (latest) => 
        latest.toFixed(decimals) + suffix
    );

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        } else {
            motionValue.set(0);
        }
    }, [inView, value, motionValue]);

    return <motion.span ref={ref}>{display}</motion.span>;
}