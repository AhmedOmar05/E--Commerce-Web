import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: "spring" }
  }),
}

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={sectionVariants}
        className="max-w-7xl mx-auto pt-6 px-4"
      >
        <CategoryList />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={sectionVariants}
        className="max-w-7xl mx-auto mt-6 px-4"
      >
        <BannerProduct />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        custom={2}
        variants={sectionVariants}
        className="max-w-7xl mx-auto mt-8 px-4"
      >
        <HorizontalCardProduct category="airpodes" heading="Top Airpods" />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        custom={3}
        variants={sectionVariants}
        className="max-w-7xl mx-auto mt-6 px-4"
      >
        <HorizontalCardProduct category="watches" heading="Popular's Watches" />
      </motion.div>
      <div className="max-w-7xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Explore More Categories</h2>
        <VerticalCardProduct category="mobiles" heading="Mobiles" />
        <VerticalCardProduct category="Mouse" heading="Mouse" />
        <VerticalCardProduct category="televisions" heading="Televisions" />
        <VerticalCardProduct category="camera" heading="Camera & Photography" />
        <VerticalCardProduct category="earphones" heading="Wired Earphones" />
        <VerticalCardProduct category="speakers" heading="Bluetooth Speakers" />
        <VerticalCardProduct category="refrigerator" heading="Refrigerator" />
        <VerticalCardProduct category="trimmers" heading="Trimmers" />
        <VerticalCardProduct category="smartwatches" heading="Smart Watches" />
      </div>
    </div>
  )
}

export default Home
