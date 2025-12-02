// import Link from 'next/link';

import { Hero } from "./_views/hero";
import { GoogleMap } from "./_components/map/google-map";
import { SectionOne } from "./_views/section-one";

const location = {
  address: "1, Ogunlesi Street, Awoyokun Bus Stop, Onipanu Lagos",
  lat: 6.535_77,
  lng: 3.365_96,
};

const GOOGLE_MAPS_API_KEY =
  process.env["NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"] || "";

const Contact = () => {
  return (
    <div>
      <Hero />
      <SectionOne />
      {/* <Link
        target="_blank"
        href={`https://www.google.com/maps/place/Tech+Studio+Academy+%7C+Tech+Training+Institute+in+Lagos/@6.5355864,3.3653758,19z/data=!3m1!4b1!4m6!3m5!1s0x103b8dba7bad97cb:0xae0bc176821041e5!8m2!3d6.5355851!4d3.3660195!16s%2Fg%2F11h4zqnp1s?authuser=0&entry=ttu`}
      >
        <section className="mb-[-40px] lg:pt-[80px] xl:min-h-[312px]">
          <BlurImage
            className="object-contain object-top lg:object-cover"
            width={1440}
            height={312}
            src="/images/location.png"
            alt="map"
          />
        </section>
      </Link> */}
      <div className="px-4 mb-4 lg:mb-0 lg:px-0">
        <div className="">
          {!GOOGLE_MAPS_API_KEY ? (
            <GoogleMap location={location} apiKey={GOOGLE_MAPS_API_KEY} />
          ) : (
            <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-gray-100 lg:h-[500px]">
              <div className="text-center">
                <p className="mb-2 text-gray-500">{`API_KEY not configured`}</p>
                <p className="text-sm text-gray-400">{`Get you api key from your google api console.`}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
