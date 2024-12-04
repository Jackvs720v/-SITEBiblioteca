<template>
    <nav class="navbar">
      <div class="navbar-left">
       <a href=""> <img src="@/assets/logo.png" alt="Logo" class="navbar-logo" @click="gotoMainFrame()" /></a>
      </div>
      <div class="navbar-center">
        <div class="search-container">
          <img src="@/assets/loupe.png" alt="Buscar" class="search-icon" />
          <input
            type="text"
            class="navbar-search"
            placeholder="Pesquisar livros..."
            v-model="searchQuery"
            @input="onSearch"
          />
          <img src="@/assets/filter.png" alt="Filtrar" class="search-icon" />
        </div>
        <a href=""><img src="@/assets/users.png" alt="Users" class="icon right-icon" @click="gotoCrudProfile()"/></a>
      </div>
      <div class="navbar-right">
        <a href="">
          <img src="@/assets/crud.png" alt="Crud" class="icon" @click="gotoCrud()"/>
        </a>
        <a href="">
          <img src="@/assets/dashboard.png" alt="DashBoard" class="icon" @click="gotoDashBoard()" />
        </a>
        <a href="">
          <img src="@/assets/reservado.png" alt="Livros Reservados" class="icon" @click="gotoReservado()" />
        </a>
        <a href="">
          <img src="@/assets/salvar.png" alt="Salvar" class="icon" @click="gotoFavoritar()"/>
        </a>
        <a href="">
          <img src="@/assets/notificacao.png" alt="Notificação" class="icon" @click="gotoNotificacao()"/>
        </a>
        <a href="">
          <img src="@/assets/infolibrary.png" alt="Informações" class="icon" @click="gotoDashBoard()" />
        </a>
        <a href="">
          <img src="@/assets/perfil.png" alt="Perfil" class="icon" @click="gotoProfile()"/>
        </a>
      </div>
    </nav>
  </template>
  
  <script>



  export default {
    name: 'Navbar',
methods:{
    gotoDashBoard() {
        this.$router.push("/dashboard")
      },  
    gotoMainFrame() {
        this.$router.push("/mainframe")
      },
    gotoCrud() {
        this.$router.push("/appbook")
      },  
    gotoProfile(){
      this.$router.push("/profile")
      },
    gotoCrudProfile(){
      this.$router.push("/crudprofile")
      },
    gotoNotificacao(){
      this.$router.push("/notificacao")
      },
    gotoFavoritar(){
      this.$router.push("/favoritar")
      },
    gotoReservado(){
      this.$router.push("/reservado")
      },
}
};
</script>
<style scoped>

/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #bcd7e5;
  padding: 15px 30px;
  border-bottom: 2px solid #007bff;
}
.navbar-left {
  display: flex;
  align-items: center;
}
.navbar-logo {
  height: 80px;
  margin-right: 10px;
}
.navbar-center {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
}
.search-container {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 5px 15px;
  width: 600px;
}
.navbar-search {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.2em;
  padding: 8px;
}
.search-icon {
  width: 30px;
  height: 30px;
  margin: 0 10px;
}

.navbar-right .icon {
  width: 30px; 
  height: 30px;
  color: #007bff;
  margin-left: 15px;
  cursor: pointer;
  transition: color 0.3s;
}
.navbar-right .icon:hover {
  color: #0056b3;
}

/* Ajuste para os ícones da barra de pesquisa */
.navbar-center .search-icon {
  width: 25px; 
  height: 25px;
  margin: 0 10px;
}

.right-icon {
  width: 30%; 
  height: 30%;
  margin-left: 15px;
}
</style>
    