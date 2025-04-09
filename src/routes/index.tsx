import { Routes as BaseRoutes, Route } from "react-router-dom";
import Auth from "./private";
import { Permissions } from "@/core/enum/permissions";
import routesArray from "./DTO";
import { createElement } from "react";

const Routes = () => {
  return (
    <BaseRoutes>
      {routesArray?.map((item) => {
        const element = createElement(item.element);

        if (item.permission === Permissions.All) {
          return <Route key={item.path} path={item.path} element={element} />;
        } else {
          return (
            <Route key={item.path} element={<Auth permissionName={item.permission} />}>
              <Route path={item.path} element={element} />
            </Route>
          );
        }
      })}
    </BaseRoutes>
  );
};

export default Routes;
