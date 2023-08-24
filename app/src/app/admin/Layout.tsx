// A layout for the admin side, left sidebar with links to pages
// and a main content area

export default function AdminLayout({ children }) {
  return (
    <>
      <Header/>
      <main>
        <SideBar/>>
        <content>
          {children}
        </content>
      </main>
      <Footer/>
    </>
  )
}