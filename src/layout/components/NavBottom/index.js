import styled from "styled-components";

const NavBottom = () => {
  return (
    <footer
      id="main-footer"
      class="py-4 text-white text-center"
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#7D9BF6",
      }}
      // style={{ backgroundColor: "#7D9BF6" }}
    >
      Lumi Homestay Management &copy;
      <span class="year"></span> contact@lumihomestay.com
    </footer>
  );
};

export default NavBottom;
