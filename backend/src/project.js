module.exports = class Project {
  constructor(id, stamp, email, title, authors, institution, summary, workCategory, extensionThematicAreas,
    researchThematicAreas, servantQualificationsThematicAreas, pdf, contract) {
      this.id = id;
      this.stamp = stamp;
      this.email = email;
      this.title = title;
      this.authors = authors;
      this.institution = institution;
      this.summary = summary;
      this.modality = workCategory;

      if(extensionThematicAreas != null)
        this.category = extensionThematicAreas;
      if(researchThematicAreas != null)
        this.category = researchThematicAreas;
      if(servantQualificationsThematicAreas != null)
        this.category = servantQualificationsThematicAreas;


      this.pdf = pdf;
      this.contract = contract;

  }
}