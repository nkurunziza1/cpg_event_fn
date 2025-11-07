import React from 'react';
import InMotion from "@/utils/inMotion";
import { User, Users, Calculator, Target, FileText, MessageSquare, Shield, Monitor } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      title: "Head of Programs",
      name: "Head of Programs",
      icon: Users,
      description: "Leading strategic program development and implementation across all organizational initiatives",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      id: 2,
      title: "Project Managers",
      name: "Project Managers", 
      icon: Target,
      description: "Overseeing project execution and delivery with excellence and precision",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      id: 3,
      title: "Grant Manager",
      name: "Grant Manager",
      icon: FileText,
      description: "Managing funding opportunities and strategic grant applications",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      id: 4,
      title: "Project Officers",
      name: "Project Officers",
      icon: User,
      description: "Supporting project implementation and community coordination",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      id: 5,
      title: "Director of Finance and Administration",
      name: "Director of Finance and Administration",
      icon: Calculator,
      description: "Overseeing financial operations and administrative excellence",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      id: 6,
      title: "Accountant",
      name: "Accountant",
      icon: Calculator,
      description: "Managing financial records and ensuring accounting transparency",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      id: 7,
      title: "MEAL Specialist",
      name: "MEAL Specialist",
      icon: Target,
      description: "Monitoring, Evaluation, Accountability and Learning excellence",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      id: 8,
      title: "Communications Specialist",
      name: "Communications Specialist",
      icon: MessageSquare,
      description: "Managing organizational communications and strategic outreach",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      id: 9,
      title: "Internal Auditor",
      name: "Internal Auditor",
      icon: Shield,
      description: "Ensuring compliance and robust internal control systems",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    },
    {
      id: 10,
      title: "IT Specialist", 
      name: "IT Specialist",
      icon: Monitor,
      description: "Managing technology infrastructure and innovative digital solutions",
      avatar: "https://www.gravatar.com/avatar/?d=mp"
    }
  ];

  return (
    <section id="team" className="bg-white mt-10 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <InMotion>
            <h2 className="text-4xl font-bold font-serif text-primary mb-6">Our Team</h2>
            <p className="text-lg font-serif text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated professionals behind our organization who drive our mission forward with expertise, passion, and commitment to excellence.
            </p>
          </InMotion>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {teamMembers.map((member) => {
            const IconComponent = member.icon;
            return (
              <div
                key={member.id}
                className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-primary transition-all duration-300 w-64"
              >
                {/* Profile Image */}
                <div className="relative h-64 bg-gradient-to-br from-primary-500 to-primary-700 overflow-hidden">
                  <img
                    src="https://www.gravatar.com/avatar/?d=mp"
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-secondary transition-colors duration-300">
                    {member.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                    {member.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;