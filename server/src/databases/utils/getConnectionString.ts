const ConnectionString = {
  ofMongo(domain: string, username: string, password: string) {
    if(!domain) {
      console.error("Domain of database is required");
      return;
    }

    if(!username) {
      console.error("Username of database user is required");
      return;
    }

    if(!password) {
      console.error("Password of database user is required");
      return;
    }

    return `mongodb+srv://${username}:${password}@${domain}/?retryWrites=true&w=majority`;
  }
}

export { ConnectionString };