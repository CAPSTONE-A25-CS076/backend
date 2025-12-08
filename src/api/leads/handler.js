class LeadsHandler {
  constructor(leadsService) {
    this._leadsService = leadsService;

    this.getLeadsHandler = this.getLeadsHandler.bind(this);
  }

  async getLeadsHandler(request, h) {
    const leads = this._leadsService.getLeads();

    const response = h.response({
      status: "success",
      data: {
        leads,
      },
    });

    response.code(200);
    return response;
  }
}

module.exports = LeadsHandler;
