export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[420px] w-full">
      <div className="video-container">
        <video src="/assets/video/background-video.mp4" autoPlay muted loop playsInline />
        <div className="video-overlay"></div>
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-3" data-aos="fade-up">
            DINAS SOSIAL
          </h1>
          <p className="text-lg md:text-2xl opacity-90" data-aos="fade-up" data-aos-delay="100">
            Kabupaten Manokwari Selatan
          </p>
          <p className="max-w-2xl mt-4 opacity-80" data-aos="fade-up" data-aos-delay="200">
            Bersama membangun kesejahteraan sosial — layanan, program, dan informasi terkini.
          </p>
        </div>
      </div>
    </section>
  )
}
