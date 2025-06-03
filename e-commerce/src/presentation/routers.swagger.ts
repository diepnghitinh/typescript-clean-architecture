import { routersConfig as WebRouters } from "./web/web.module";
import { routersConfig as AdminRouters } from "./admin/admin.module";
import { routersConfig as IdentityRouters } from "./identity/identity.module";

export const presentationRoutes = [
    WebRouters,
    AdminRouters,
    IdentityRouters,
];