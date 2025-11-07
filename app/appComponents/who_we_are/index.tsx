import InMotion from "@/utils/inMotion";
import { Users } from "lucide-react";

const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="bg-gray-50 py-20 font-serif text-neutral-200 italic">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <InMotion>
              <h2 className="text-4xl  font-bold text-center mb-16 text-secondary">
                Who We Are
              </h2>
            </InMotion>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[500px]">
              {/* Image Section */}
              <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full">
                <img 
                  src="https://res.cloudinary.com/dexaxaqjx/image/upload/v1741016338/WhatsApp_Image_2025-03-03_at_15.04.41_rplglw.jpg" 
                  alt="AFOR Team" 
                  className="w-full h-full object-cover absolute inset-0" 
                />
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-8 lg:p-12 relative flex flex-col justify-center">
                {/* Quote Icon */}
                <div className="absolute top-4 left-4 text-6xl text-primary font-serif leading-none opacity-20">
                  "
                </div>

                <div className="relative z-10 pt-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    At our organization, the Authentic Family Organization
                    "AFOR" is wholly committed to delivering unparalleled
                    service to our valued communities. From the very first point
                    of contact, communities are warmly welcomed with a friendly
                    approach and a supportive demeanor. Our team undergoes
                    rigorous training to adeptly handle community requests and
                    inquiries with efficiency and efficacy, ensuring a
                    remarkable experience that upholds the elevated standards we
                    hold dear.
                  </p>

                  <div className="border-l-4 border-secondary pl-6 mb-6">
                    <p className="text-gray-600 leading-relaxed">
                      AFOR was established as a civil society organization on
                      15th February 2015 and registered in accordance with the
                      law N°05/2024 of 20/06/2024 governing the organization and
                      functioning of NGOs on 182/RGB/NGO/LP/12/2017.
                    </p>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    AFOR seeks to contribute to Rwanda's socioeconomic
                    development through building authentic families. Our
                    organization initiates various programs that address diverse
                    needs and concerns, ranging from advocacy and awareness
                    raising to capacity building, economic empowerment, and
                    cultural activities.
                  </p>
                </div>

                {/* Closing Quote */}
                <div className="absolute bottom-4 right-4 text-6xl text-primary font-serif leading-none rotate-180 opacity-20">
                  "
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;