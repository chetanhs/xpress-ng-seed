var _ = require("underscore")._;

var
  seedCompanyId = 0,
  seedJobId = 0,
  getCompanyId = function (argument) {
    return ++seedCompanyId;
  },
  companyNameFirstHalfTokens = ["Dev", "Xtreme", "Smart", "Advanced", "Mega"],
  companyNameSecondHalfTokens = ["Ware", "Force", "Minds", "Tech", "Tronics"],
  companyNameOrgTypeTokens = ["Inc.", "Ltd.", "LLC.", "Corp.", "Pty."],
  getNextJobId = function(){
    return ++seedJobId;
  },
  keywords = ["web", "javascript", "developer", "reporting", "lead"],
  titleFirstPartTokens = ["Looking for"],
  titleSecondPartTokens = ["Angularjs", "Backbonejs", "Front end"],
  titleThirdPartTokens = ["Developer", "Lead"],
  titleFourthPartTokens = ["Required", "Needed"],
  description = "Should be a fanstastic devleoper. Experienced in javascript development. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet nisl ut lorem iaculis, placerat mollis mi pharetra. Nulla facilisi. Nam ullamcorper, tortor quis interdum fringilla, erat libero rhoncus est, eget rutrum urna odio nec erat. Vivamus consequat aliquet leo, sit amet sollicitudin ligula malesuada ac. Proin convallis erat adipiscing erat pharetra fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas dapibus interdum felis sed iaculis. Aliquam pulvinar ultricies sem, et accumsan nunc euismod vel. Praesent vitae ipsum mattis, dapibus libero vitae, venenatis tellus. Duis facilisis a elit eu gravida. Ut semper vulputate laoreet.",
  types = ["Full Time", "Part Time", "Contract to Hire"],
  getInitials = function(companyNameTokens){
    return _.map(companyNameTokens, function(t){ return t.substr(0, 1).trim(); }).join("");
  };

var SearchService = {
    getSeedData: function(size){
      var seedData = {}, job, jobs = [], id, companies = [], companyName, company, hasTitleSuffix = false, reducedKeywords, now, companyNameTokens;

      for (var i = 0; i < size; i++) {
        job = {id: getNextJobId()};

        companyNameTokens = [];
        companyNameTokens.push(companyNameFirstHalfTokens[Math.round(Math.random() * (companyNameFirstHalfTokens.length - 1) )]);
        companyNameTokens.push(companyNameSecondHalfTokens[Math.round(Math.random() * (companyNameSecondHalfTokens.length - 1) )]);
        companyNameTokens.push(" ");
        companyNameTokens.push(companyNameOrgTypeTokens[Math.round(Math.random() * (companyNameOrgTypeTokens.length - 1) )]);

        companyName = companyNameTokens.join("");

        company = _.findWhere(companies, {name: companyName});
        if(!company){
          company = {id: getCompanyId(), name: companyName, initials: getInitials(companyNameTokens)};
          companies.push(company);
        }
        job.company = company;

        hasTitleSuffix = Math.round(Math.random) > 0;
        job.title = (hasTitleSuffix ? titleFirstPartTokens[Math.round(Math.random() * (titleFirstPartTokens.length - 1) )] : "") +
        " " +
        titleSecondPartTokens[Math.round(Math.random() * (titleSecondPartTokens.length - 1) )] +
        " " +
        titleThirdPartTokens[Math.round(Math.random() * (titleThirdPartTokens.length - 1) )];
        if(!hasTitleSuffix){
          job.title +=" " +
          titleFourthPartTokens[Math.round(Math.random() * (titleFourthPartTokens.length - 1) )];
        }

        if(_.findWhere(jobs, {title: job.title})){
          continue;
        }

        job.description = description;

        job.keywords = [keywords[Math.round(Math.random() * (keywords.length - 1))]];
        reducedKeywords = _.reject(keywords, function(k){ return job.keywords.indexOf(k) > -1; });
        job.keywords.push(reducedKeywords[Math.round(Math.random() * (reducedKeywords.length - 1))]);

        now = (new Date(Date.now()));
        now.setDate(now.getDate() - Math.round(Math.random() * 4));
        job.activeSince = now.toUTCString();

        now = (new Date(Date.now()));
        now.setDate(now.getDate() + Math.round(Math.random() * 4));
        job.expiresOn = now.toUTCString();

        job.type = types[Math.round(Math.random() * (types.length - 1) )];

        jobs.push(job);
      }

      seedData.jobs = jobs;

      return seedData;
    },
    query: function(req, res, callback){
      var result;

      console.log("Getting results for "+req.query.q);
      if(req.query.q){
        var regExp = new RegExp("\\b"+req.query.q, "i");
        result = _.select(req.session.db.jobs, function(j){
          return j.title.match(regExp) != null || j.company.name.match(regExp) != null || (_.select(j.keywords, function(k){ return k.match(regExp) != null}).length > 0) ;
        });
      }else{
        result = req.session.db.jobs;
      }
      callback.apply(this, [result]);
    }
};

module.exports = SearchService;