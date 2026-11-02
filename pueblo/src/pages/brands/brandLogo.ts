const logos:Record<string,string>={ASICS:'asics',NIKE:'nike',ADIDAS:'adidas','NEW BALANCE':'new-balance',SALOMON:'salomon',ROA:'roa',FILA:'fila',STUSSY:'stussy',CONVERSE:'converse'};
const additionalLogos:Record<string,string>={
  "UMBRO": "/images/brands/umbro.png",
  "SEVENTH": "/images/brands/seventh.png",
  "ON": "/images/brands/on.png",
  "GRAMICCI": "/images/brands/gramicci.png",
  "FUCKING AWESOME": "/images/brands/fuckingawesome.jpg",
  "OAKLEY": "/images/brands/oakley.png",
  "PRAYING": "/images/brands/praying.png",
  "GOOMHER": "/images/brands/goomher.png",
  "CAV EMPT": "/images/brands/cavempt.png",
  "POP TRADING COMPANY": "/images/brands/poptradingcompany.jpg",
  "HUMAN MADE": "/images/brands/humanmade.jpg",
  "POLYSOOEM": "/images/brands/polysooem.png",
  "LEVI'S": "/images/brands/levis.png",
  "EASTLOGUE": "/images/brands/eastlogue.jpg",
  "GX1000": "/images/brands/gx1000.png",
  "OBEY": "/images/brands/obey.jpg",
  "NO PROBLEMO": "/images/brands/noproblemo.png",
  "ASHLEY WILLIAMS": "/images/brands/ashleywilliams.png",
  "TEKET": "/images/brands/teket.png",
  "NEIGHBORHOOD": "/images/brands/neighborhood.png",
  "DIRDDY": "/images/brands/dirddy.png",
  "MSCHF": "/images/brands/mschf.jpg",
  "ARIES": "/images/brands/aries.jpg",
  "OPEN YY": "/images/brands/openyy.jpg",
  "VIOLET": "/images/brands/violet.png",
  "CARHARTT WIP": "/images/brands/carharttwip.jpg",
  "RAB": "/images/brands/rab.jpg",
  "P.A.M.": "/images/brands/pam.jpg",
  "DIME": "/images/brands/dime.png",
  "JORDAN": "/images/brands/jordan.jpg"
};
export function brandLogo(brand:{name:string;logoUrl?:string|null}) {
 const local=logos[brand.name.trim().toUpperCase()];
 return brand.logoUrl||additionalLogos[brand.name.trim().toUpperCase()]||(local?`/images/brands/${local}.png`:undefined);
}
