import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ConsentBanner from './components/ConsentBanner'
import Home from './pages/Home'
import ExerciseLibrary from './pages/ExerciseLibrary'
import ExerciseDetail from './pages/ExerciseDetail'
import Calculators from './pages/Calculators'
import OneRepMax from './pages/OneRepMax'
import TDEE from './pages/TDEE'
import PlateauBreaker from './pages/PlateauBreaker'
import PlateCalculator from './pages/PlateCalculator'
import Tracker from './pages/Tracker'
import Records from './pages/Records'
import PrivacyPolicy from './pages/PrivacyPolicy'
import WarmupCalculator from './pages/WarmupCalculator'
import Measurements from './pages/Measurements'
import Goals from './pages/Goals'
import Templates from './pages/Templates'
import Badges from './pages/Badges'
import Standards from './pages/Standards'
import Guides from './pages/Guides'
import PushPullLegs from './pages/guides/PushPullLegs'
import OneRepMaxGuide from './pages/guides/OneRepMaxGuide'
import PlateauGuide from './pages/guides/PlateauGuide'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExerciseLibrary />} />
          <Route path="/exercises/:slug" element={<ExerciseDetail />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/one-rep-max" element={<OneRepMax />} />
          <Route path="/calculators/tdee" element={<TDEE />} />
          <Route path="/calculators/plateau-breaker" element={<PlateauBreaker />} />
          <Route path="/calculators/plates" element={<PlateCalculator />} />
          <Route path="/calculators/warmup" element={<WarmupCalculator />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/records" element={<Records />} />
          <Route path="/measurements" element={<Measurements />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/push-pull-legs-split" element={<PushPullLegs />} />
          <Route path="/guides/how-to-calculate-your-1rm" element={<OneRepMaxGuide />} />
          <Route path="/guides/breaking-a-strength-plateau" element={<PlateauGuide />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  )
}
