import Topbar from "../components/Topbar";
import '../style/aboutUs/dev-cards.css';
import '../style/aboutUs/project-description.css';

const developers = [
  {
    name: "Dana",
    role: "Frontend Developer",
    bio: "Passionate about UI/UX, animations and modern web technologies. Loves creating elegant interfaces.",
    img: "/images/devImages/dana.png",
  },
  {
    name: "Nadiia",
    role: "Project Manager",
    bio: "Our sunshine",
    img: "/images/devImages/nadiia.png",
  },
  {
    name: "Marta",
    role: "Team lead, frontend",
    bio: "Combines frontend and backend skills to cook. The best team lead in whole world.",
    img: "/images/devImages/marta.jpg",
  },
  {
    name: "Vadym",
    role: "Tech Lead",
    bio: "Team's talisman, always bringing positive energy and inspiration to every project.",
    img: "/images/devImages/vadym.jpg",
    imgStyle: { objectPosition: 'top' },
  },
  {
    name: "Denys",
    role: "Fullstack Developer",
    bio: "Specializes in databases, APIs and performance optimization. Fan of clean architecture and testing.",
    img: "/images/devImages/denys.jpg",
  },
  {
    name: "Ostap",
    role: "Senior HolyC Developer",
    bio: "Known for his deep expertise and innovative solutions🎀",
    img: "/images/devImages/ostap.jpg",
  },
];

function AboutUs() {
  return (
    <main>
      <Topbar />
      <section class="description-section">
        <div class="section-header">
          <h2 class="section-title">About LeetHack</h2>
          <p class="section-subtitle">Connecting innovators with opportunities</p>
        </div>

        <p class="project-description">
          We are a platform that simplifies hackathon participation by providing easy registration and management tools for participants. We handle the technical side of event coordination, making it easier for participants to focus on what matters most - building amazing projects.
        </p>

        <div class="highlight-box">
          "We believe that great ideas deserve great execution, which is why we've built a space where creativity can flourish without technical barriers getting in the way."
        </div>

        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🚀</div>
            <div class="feature-title">For Beginners</div>
            <div class="feature-text">Perfect for first-time hackathon participants with intuitive guidance and support</div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">🔗</div>
            <div class="feature-title">Smart Connections</div>
            <div class="feature-text">Connect talented individuals with exciting hackathon opportunities</div>
          </div>

          <div class="feature-item">
            <div class="feature-icon">⚙️</div>
            <div class="feature-title">Full Management</div>
            <div class="feature-text">We take care of all administrative details so you can focus on innovation</div>
          </div>
        </div>
      </section>

      <section className="developers-section">
        <h2>Meet Our Developers</h2>
        <p>Our dedicated team brings your ideas to life with passion, precision, and a love for clean code.</p>

        <div className="developers-grid">
          {developers.map(({ name, role, bio, img, imgStyle }, idx) => (
            <div key={idx} className="developer-card">
              <div className="developer-image">
                <img src={img} alt={`Developer ${name}`} style={imgStyle || {}} />
              </div>
              <div className="developer-info">
                <div className="developer-name">{name}</div>
                <div className="developer-role">{role}</div>
                <div className="developer-bio">{bio}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
