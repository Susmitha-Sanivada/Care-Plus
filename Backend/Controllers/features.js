module.exports = class Features {
  constructor(req, query) {
    this.req = req;
    this.query = query;
  }
  // filtering
  filter() {
    if (this.req.query) {
      const query_obj = { ...this.req.query };
      const exclude_fields = ["sort", "page", "limit"];
      exclude_fields.forEach((el) => {
        delete query_obj[el];
      });
      this.query.find(query_obj);
    }

    return this;
  }
  sort() {
    if (this.req.query.sort) {
      this.query.find().sort(`-${this.req.query.sort}`);
    }

    return this;
  }
  paginate() {
    if (this.req.query.page || this.req.query.limit) {
      const page = parseInt(this.req.query.page) || 1;
      const limit = parseInt(this.req.query.limit) || 10;
      const skip = (page - 1) * limit;

      //
      //
      this.query.find().skip(skip).limit(limit);
    }
    return this;
  }
};
// sorting limiting pagination filtering aliasing

// search for a record
// list of all pending records
// list of all completed records
