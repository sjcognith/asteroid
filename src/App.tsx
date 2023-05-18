import {
  createBrowserRouter,
  RouteObject,
  RouterProvider
} from "react-router-dom";
import Root from "./components/Root";
import Skills from "./components/skills/Skills";
import Asteroid from "./pages/Asteroid";
import Home from "./pages/Home";

const App = () => {
  const skills = ["PROGRAMMING", "FISHING", "JUMPING"];

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/asteroid/:id",
          element: <Asteroid />,
        },
        {
          path: "/skills",
          element: <Skills skills={skills} />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  // Input: nums = [2,7,11,15], target = 9
  // Output: [0,1]

  // const nums = [12, 7, 11, 15];
  // const nums = [11, 1, 3, 15, 7, 3, 9];
  // const target = 9;

  // function twoSum(nums: any, target: any) {
  //   const output: any[] = [];

  //   for (let i = 0; i < nums.length; i++) {
  //     const element = nums[i];
  //     if (element < target) {
  //       for (let c = i + 1; c < nums.length; c++) {
  //         const innerElement = nums[c];
  //         const sumOfTwo = innerElement + element;
  //         if (sumOfTwo === target) {
  //           output.push(i);
  //           output.push(c);
  //           return output;
  //         }
  //       }
  //     }
  //   }

  //   return output;
  // }

  // const result = twoSum(nums, target);
  // console.log(result);
  
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
