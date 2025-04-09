import { Permissions } from "@/core/enum/permissions";
import { ROUTES } from "@/core/enum/routes";
import PermissionsPage from "@/pages/system/admin/permissions";
import ActiveAccount from "@/pages/main/auth/active-account";
import Login from "@/pages/main/auth/login";
import LogoutPage from "@/pages/main/auth/logout";
import NewPasssword from "@/pages/main/auth/new-password";
import RecoveryPasssword from "@/pages/main/auth/recovery-password";
import Register from "@/pages/main/auth/register";
import NotFound from "@/pages/main/errors/not-found";
import Unauthorized from "@/pages/main/errors/unauthorized";
import Principal from "@/pages/main/principal/editions/2025";
import UserHome from "@/pages/system/portal/home";
import NewEditPermissionPage from "@/pages/system/admin/permissions/new-edit-permission";
import SettingsPermissionsPage from "@/pages/system/admin/settings/permissions";
import FinancesPage from "@/pages/system/admin/finances";
import NewFinancePage from "@/pages/system/admin/finances/new-finance";
import EditFinancePage from "@/pages/system/admin/finances/edit-finance";
import { SettingsHomePage } from "@/pages/system/admin/settings/home";
import ActivitiesPage from "@/pages/system/admin/activities";
import { EventsPage } from "@/pages/system/portal/events";
import { TicketsPage } from "@/pages/system/portal/events/tickets";
import { EventActivitiesPage } from "@/pages/system/portal/events/activities";
import { championshipPage } from "@/pages/system/portal/championship";
import { supportPage } from "@/pages/system/portal/support";
import { EntryPage } from "@/pages/system/admin/entry";
import { EditProfilePage } from "@/pages/system/portal/home/profile";
import { PaymentConfirmationPage } from "@/pages/system/admin/payment-confirmation";
import { SendEmailPage } from "@/pages/system/admin/email/send-email";
import { AccreditationPage } from "@/pages/system/admin/accreditation";
import { PrintPage } from "@/pages/system/admin/entry/print";
import { NewActivityPage } from "@/pages/system/admin/activities/new-activity";
import { EditActivityPage } from "@/pages/system/admin/activities/edit-activity";
import { SettingsEventsPage } from "@/pages/system/admin/settings/events";
import { BadgeGeneratorPage } from "@/pages/system/admin/badge-generator";
import { ParticipationReportPage } from "@/pages/system/admin/reports/participation";
import { SingleCertificateGeneratorPage } from "@/pages/system/admin/certificate-generator/single";
import { CertificatePage } from "@/pages/system/portal/certificate";
import Validate from "@/pages/main/validate";
import { MultipleCertificateGeneratorPage } from "@/pages/system/admin/certificate-generator/multiple";
import { CertificateUserPage } from "@/pages/system/admin/certificate-generator/user";
import { SendCertificatePage } from "@/pages/system/admin/email/send-certificate";
import { SendCertificateUserPage } from "@/pages/system/admin/email/send-certificate/user";
import { SendEspecialPage } from "@/pages/system/admin/email/send-especial";
import { EventSettingsPage } from "@/pages/system/admin/events/settings";
import MinicourseSelectorPage from "@/pages/system/portal/minicourses";

interface RouteProps {
  path: string;
  permission: string;
  element: any;
}

const route = new Map();
const routesArray: RouteProps[] = [];

route.set("*", {
  element: NotFound,
  permission: Permissions.All,
});

route.set(ROUTES.PRINCIPAL, {
  element: Principal,
  permission: Permissions.All,
});

route.set(ROUTES.LOGIN, {
  element: Login,
  permission: Permissions.All,
});

route.set(ROUTES.REGISTER, {
  element: Register,
  permission: Permissions.All,
});

route.set(ROUTES.VALIDATE, {
  element: Validate,
  permission: Permissions.All,
});

route.set(ROUTES.RECOVERY_PASSWORD, {
  element: RecoveryPasssword,
  permission: Permissions.All,
});

route.set(ROUTES.ACTIVE_ACCOUNT, {
  element: ActiveAccount,
  permission: Permissions.All,
});

route.set(ROUTES.NEW_PASSWORD, {
  element: NewPasssword,
  permission: Permissions.All,
});

route.set(ROUTES.LOGOUT, {
  element: LogoutPage,
  permission: Permissions.All,
});

route.set(ROUTES.UNAUTHORIZED, {
  element: Unauthorized,
  permission: Permissions.All,
});

route.set(ROUTES.HOME, {
  element: UserHome,
  permission: Permissions.Home,
});

route.set(ROUTES.PROFILE, {
  element: EditProfilePage,
  permission: Permissions.Home,
});

route.set(ROUTES.ENTRY, {
  element: EntryPage,
  permission: Permissions.Entry,
});

route.set("/lista", {
  element: PrintPage,
  permission: Permissions.Entry,
});

route.set(ROUTES.ACCREDITATION, {
  element: AccreditationPage,
  permission: Permissions.Accreditation, 
});

route.set(ROUTES.FINANCES, {
  element: FinancesPage,
  permission: Permissions.Finance,
});

route.set(ROUTES.PAYMENT_CONFIRMATION, {
  element: PaymentConfirmationPage,
  permission: Permissions.PaymentConfirmation,
});

route.set(ROUTES.SEND_EMAIL, {
  element: SendEmailPage,
  permission: Permissions.SendEmail,
});

route.set(ROUTES.SEND_CERTIFICATE, {
  element: SendCertificatePage,
  permission: Permissions.SendEmail,
});

route.set(ROUTES.SEND_CERTIFICATE_USER_ID, {
  element: SendCertificateUserPage,
  permission: Permissions.SendEmail,
});

route.set(ROUTES.SEND_CERTIFICATE_ESPECIAL, {
  element: SendEspecialPage,
  permission: Permissions.SendEmail,
});

route.set(ROUTES.BADGE_GENERATOR, {
  element: BadgeGeneratorPage,
  permission: Permissions.BadgeGenerator,
});

route.set(ROUTES.NEW_FINANCE, {
  element: NewFinancePage,
  permission: Permissions.Finance,
});

route.set(ROUTES.EDIT_FINANCE_ID, {
  element: EditFinancePage,
  permission: Permissions.Finance,
});

route.set(ROUTES.PERMISSIONS, {
  element: PermissionsPage,
  permission: Permissions.Permission,
});

route.set(ROUTES.ACTIVITIES, {
  element: ActivitiesPage,
  permission: Permissions.Activities,
});

route.set(ROUTES.NEW_ACTIVITY, {
  element: NewActivityPage,
  permission: Permissions.Activities,
});

route.set(ROUTES.EDIT_ACTIVITY_ID, {
  element: EditActivityPage,
  permission: Permissions.Activities,
});

route.set(ROUTES.EVENTS, {
  element: EventsPage,
  permission: Permissions.Events,
});

route.set(ROUTES.SETTINGS_EVENTS, {
  element: SettingsEventsPage,
  permission: Permissions.SettingsEvents,
});

route.set(ROUTES.TICKETS, {
  element: TicketsPage,
  permission: Permissions.Events,
});

route.set(ROUTES.EVENT_ACTIVITIES, {
  element: EventActivitiesPage,
  permission: Permissions.Events,
});

route.set(ROUTES.EVENT_SETTINGS, {
  element: EventSettingsPage,
  permission: Permissions.Settings,
});

route.set(ROUTES.CHAMPIONSHIP, {
  element: championshipPage,
  permission: Permissions.Events,
});

route.set(ROUTES.CERTIFICATE, {
  element: CertificatePage,
  permission: Permissions.Certificate,
});

route.set(ROUTES.SUPPORT, {
  element: supportPage,
  permission: Permissions.All,
});

route.set(ROUTES.CERTIFICATE_SIMPLE, {
  element: SingleCertificateGeneratorPage,
  permission: Permissions.CertificateGenerator,
});

route.set(ROUTES.CERTIFICATE_MULTIPLE, {
  element: MultipleCertificateGeneratorPage,
  permission: Permissions.CertificateGenerator,
});

route.set(ROUTES.CERTIFICATE_USER_ID, {
  element: CertificateUserPage,
  permission: Permissions.CertificateGenerator,
});

route.set(ROUTES.REPORT_PARTICIPATION, {
  element: ParticipationReportPage,
  permission: Permissions.Reports,
});

route.set(ROUTES.SETTINGS_HOME, {
  element: SettingsHomePage,
  permission: Permissions.SettingsHome,
});

route.set(ROUTES.SETTINGS_PERMISSIONS, {
  element: SettingsPermissionsPage,
  permission: Permissions.SettingsPermission,
});

route.set(ROUTES.SETTINGS_NEW_PERMISSION, {
  element: NewEditPermissionPage,
  permission: Permissions.SettingsPermission,
});

route.set(ROUTES.SELECT_ACTIVITIES, {
  element: MinicourseSelectorPage,
  permission: Permissions.Events,
});

for (const [key, value] of route) {
  const aux = value;
  aux.path = key;

  routesArray.push(aux);
}

export default routesArray;
