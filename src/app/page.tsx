import { Hero } from "./_components/hero"
import { About } from "./_components/about"
import { Services } from "./_components/services"
import { Testimonials } from "./_components/testimonials"
import { Footer } from "./_components/footer"
import { Navebar } from "./_components/navebar"

export default function Home() {
  return (
    <main>
      <Navebar/>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Footer />
    </main>
  )
}