import Image from 'next/image'; 

export function Statistics() {
  const stats = [
    {
      value: "200k",
      label: "Kundli Served",
    },
    {
      value: "50+",
      label: "Year's Of Legacy",
    },
    {
      value: "100k+",
      label: "Consultations Given",
    },
    {
      value: "20+",
      label: "Awards in the field of Occult",
    }
  ];

  return (
    <section 
      className="py-16 rounded-3xl relative overflow-hidden bg-[#FFF5E1]"
    >
      <div className="px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#a084ee] to-[#f857a6] bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-base text-center font-medium text-[#23244a]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
