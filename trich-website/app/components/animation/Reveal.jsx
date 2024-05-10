"use client"
import {motion, useAnimationControls, useInView} from 'framer-motion'
import {useEffect, useRef} from 'react'
const RevealTitle = ({children, className}) => {
	const ref = useRef(null)
	const isInView = useInView(ref, {once: false})
	const mainControls = useAnimationControls()

	useEffect(() => {
		if (isInView) {
			mainControls.start('visible')
		} else {
			mainControls.start('hidden')
		}
	}, [mainControls, isInView])
	return (
		<div ref={ref} style={{position: 'relative', overflow: 'hidden'}} className={className}>
			<motion.div
				variants={{
					hidden: {opacity: 0, y: 75},
					visible: {opacity: 1, y: 0},
				}}
				initial="hidden"
				animate={mainControls}
				transition={{ease: 'easeIn', duration: 0.5}}
			>
				{children}
			</motion.div>
		</div>
	)
};

export default RevealTitle;