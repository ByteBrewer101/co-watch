import { UserRegisterForm } from "@/components/UserRegisterForm";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, MessageSquare, Video, Check } from "lucide-react";
import { NavBar } from "@/components/NavBar";

export function Homepage() {
  const navigate = useNavigate();
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background overflow-hidden">
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1)_0px,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1)_0px,transparent_50%),radial-gradient(circle_at_40%_80%,rgba(120,119,255,0.1)_0px,transparent_50%)] bg-[length:200px_200px]"
        />
      </div>
      <NavBar/>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mb-6"
          >
            <h1
              onClick={() => navigate("/")}
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-600 mb-4 cursor-pointer"
            >
              co-watch
            </h1>
          </motion.div>
          
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6"
          >
            Watch videos together in real-time with friends, family, and communities. 
            Sync playback, chat live, and create shared memories.
          </motion.p>
          
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            No registration required
          </Badge>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid lg:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Left Column - Registration Form */}
          <motion.div variants={fadeInUp} className="lg:order-2">
            <UserRegisterForm />
          </motion.div>

          {/* Right Column - Features */}
          <motion.div variants={fadeInUp} className="lg:order-1">
            <Card className="h-full border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Features ✨
                </CardTitle>
                <CardDescription>
                  Everything you need for the perfect watch party
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  {[
                    {
                      icon: Video,
                      title: "Sync Playback",
                      description: "Perfectly synchronized video playback for everyone in the room",
                      color: "bg-primary/10 text-primary"
                    },
                    {
                      icon: MessageSquare,
                      title: "Real-time Chat",
                      description: "Chat, react, and share moments as they happen",
                      color: "bg-pink-500/10 text-pink-500"
                    },
                    {
                      icon: Users,
                      title: "Create Rooms",
                      description: "Private or public rooms for any occasion",
                      color: "bg-blue-500/10 text-blue-500"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent/50 transition-colors"
                    >
                      <div className={`${feature.color} p-3 rounded-lg`}>
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Stats/Highlights */}
                <motion.div
                  variants={fadeInUp}
                  className="grid grid-cols-3 gap-4 pt-6 border-t"
                >
                  {["Free Forever", "No Login", "All Devices"].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={floatingAnimation.animate}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-primary mb-1">
                        100%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Bottom CTA/Testimonials */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-16"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-pink-500/5">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-6">
                  Join thousands enjoying together
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "No registration needed",
                    "Free forever",
                    "Works on all devices"
                  ].map((text, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-4 py-2 text-sm"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {text}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}