import { motion } from "framer-motion";
import { Camera, Zap, BookOpen, Shield, Leaf, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Instant Photo Analysis",
    description: "Simply snap a photo of your plant and get results in seconds. No technical knowledge required."
  },
  {
    icon: Zap,
    title: "AI-Powered Detection",
    description: "Our advanced machine learning models can identify over 50 common plant diseases with high accuracy."
  },
  {
    icon: BookOpen,
    title: "Treatment Guides",
    description: "Receive detailed, step-by-step treatment recommendations tailored to your specific plant condition."
  },
  {
    icon: Shield,
    title: "Prevention Tips",
    description: "Learn how to prevent future outbreaks and keep your garden healthy year-round."
  },
  {
    icon: Leaf,
    title: "Plant Care Library",
    description: "Access our comprehensive database of plant care guides, watering schedules, and growing tips."
  },
  {
    icon: BarChart3,
    title: "Health Tracking",
    description: "Monitor your plant's health over time and track improvements after treatment."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <Leaf className="w-4 h-4" />
            Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Protect</span> Your Plants
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive toolkit helps you identify, treat, and prevent plant diseases 
            with professional-grade accuracy.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-background rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl leaf-gradient flex items-center justify-center mb-4 glow-primary group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
