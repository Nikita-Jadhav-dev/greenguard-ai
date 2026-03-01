import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Diseases Detected" },
  { value: "94%", label: "Accuracy Rate" },
  { value: "100K+", label: "Plants Analyzed" },
  { value: "24/7", label: "Available" },
];

const StatsSection = () => {
  return (
    <section className="py-16 leaf-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mb-2"
              >
                {stat.value}
              </motion.p>
              <p className="text-primary-foreground/80 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
