import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
    return (
        <div className="w-full">
            <OrganizationProfile
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: "none",
                            width: "100%",
                            gridTemplateColumns: "1fr"
                        },
                        cardBox: {
                            border: "1px solid #e5ee5",
                            boxShadow: "none",
                            width: "100%"
                        },
                        navbar: {
                            display: "none"
                        },
                        navbarMobileMenuRow: {
                            display: "none"
                        }
                    }
                }}
            />
        </div>
    )
}

export default SettingsPage;