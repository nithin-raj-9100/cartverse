// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";

// export default function ProductGrid() {
//   const products = [
//     {
//       name: "Zip Tote Basket",
//       price: "$140",
//       colors: ["White and black"],
//       image: "/images/zip-tote-basket.jpg",
//     },
//     {
//       name: "Zip High Wall Tote",
//       price: "$150",
//       colors: ["White and blue"],
//       image: "/images/zip-high-wall-tote.jpg",
//     },
//     {
//       name: "Halfsize Tote",
//       price: "$210",
//       colors: ["Clay"],
//       image: "/images/halfsize-tote.jpg",
//     },
//     {
//       name: "High Wall Tote",
//       price: "$210",
//       colors: ["Black and orange"],
//       image: "/images/high-wall-tote.jpg",
//     },
//   ];

//   return (
//     <section className="bg-white py-12 sm:py-16">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//           Customers also bought
//         </h2>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {products.map((product, index) => (
//             <Card key={index} className="group relative">
//               <CardHeader className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                 />
//               </CardHeader>
//               <CardContent className="mt-4 flex justify-between">
//                 <div>
//                   <h3 className="text-sm text-gray-700">
//                     <a href="#">
//                       <span aria-hidden="true" className="absolute inset-0" />
//                       {product.name}
//                     </a>
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     {product.colors.join(", ")}
//                   </p>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900">
//                   {product.price}
//                 </p>
//               </CardContent>
//               <CardFooter>
//                 <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800">
//                   Add to bag
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
