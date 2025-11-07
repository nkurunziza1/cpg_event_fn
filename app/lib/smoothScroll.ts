export const scrollToSection = (targetId: string) => {
  const isHome = window.location.pathname === "/";

  if (isHome) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return true;
    }
    return false;
  } else {
    window.location.href = `/#${targetId}`;
    return true;
  }
};
