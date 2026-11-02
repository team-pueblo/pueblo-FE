const logos:Record<string,string>={ASICS:'asics',NIKE:'nike',ADIDAS:'adidas','NEW BALANCE':'new-balance',SALOMON:'salomon',ROA:'roa',FILA:'fila',STUSSY:'stussy',CONVERSE:'converse'};
export function brandLogo(brand:{name:string;logoUrl?:string|null}) {
 const local=logos[brand.name.trim().toUpperCase()];
 return brand.logoUrl||(local?`/images/brands/${local}.png`:undefined);
}
