import { routersConfig as WebRouters } from "./web/web.module";
import { routersConfig as AdminRouters } from "./admin/admin.module";

export const presentationRoutes = [
    WebRouters,
    AdminRouters,
];