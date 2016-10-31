var demoController=function($scope,$window)
{

  var textParser= new TDMATRIX();

  $scope.IsResultShown=false;

  $scope.SourceDocText="";

  $scope.DestDocText="";

  $scope.SourceDocument=null;

  $scope.DestDocument=null;

  $scope.percentage=0;

  $scope.Reset=function()
  {
    $scope.SourceDocText="";

    $scope.DestDocText="";

    $scope.IsResultShown=false;
  }

  $scope.Compare=function()
  {
      //$window.scrollTo(0, $window.innerHeight);
      $scope.ExtractedSentneces=[];



      //Extract Sentences
      var extractedDocuments=textParser.ExtractDocuments([$scope.SourceDocText,$scope.DestDocText]);


      if(extractedDocuments!=null && extractedDocuments.length==2)
      {
      textParser.NormlizeTermsFrequency(extractedDocuments,0);


      $scope.SourceDocument=extractedDocuments[0];

      $scope.DestDocument=extractedDocuments[1];


      var distance=textParser.GetDistance($scope.SourceDocument,$scope.DestDocument);

      var proceededToken={};

      var replaceRegex="";

      var totalNumberOfUniqueTerms=0;

      var thrShold=0;

      for(var key in $scope.SourceDocument.terms)
      {
        var currentTermInSourceDoc=$scope.SourceDocument.terms[key];
        var currentTermInDestDoc=$scope.DestDocument.terms[key];

        if(currentTermInDestDoc !=null && currentTermInSourceDoc!=null)
        {
          if(currentTermInDestDoc.weight>=thrShold && currentTermInSourceDoc.weight>=thrShold)
          {
            var regex=new RegExp(currentTermInDestDoc.value,"ig");
            $scope.SourceDocument.value=$scope.SourceDocument.value.replace(regex,'<span class=\"highlight\">'+currentTermInDestDoc.value+'</span>');
            $scope.DestDocument.value=$scope.DestDocument.value.replace(regex,'<span class=\"highlight\">'+currentTermInDestDoc.value+'</span>');
          }
        }

        proceededToken[key]=true;

        ++totalNumberOfUniqueTerms;
      }


      for(var key in $scope.DestDocument.terms)
      {
        if(proceededToken[key])
        {
          continue;
        }

        var currentTermInSourceDoc=$scope.SourceDocument.terms[key];

        var currentTermInDestDoc=$scope.DestDocument.terms[key];

        if(currentTermInDestDoc !=null && currentTermInSourceDoc!=null)
        {
          if(currentTermInDestDoc.weight>=thrShold && currentTermInSourceDoc.weight>=thrShold)
          {
            var regex=new RegExp(currentTermInDestDoc.value,"ig");
            $scope.SourceDocument.value=$scope.SourceDocument.value.replace(regex,'<span class=\"highlight\">'+currentTermInDestDoc.value+'</span>');
            $scope.DestDocument.value=$scope.DestDocument.value.replace(regex,'<span class=\"highlight\">'+currentTermInDestDoc.value+'</span>');
          }
        }

        proceededToken[key]=true;

        ++totalNumberOfUniqueTerms;
      }
        if(totalNumberOfUniqueTerms==0)
        {
          alert("One of the two documents should contain at least one complete sentence");
          return;
        }

      $scope.percentage=100-((distance/Math.sqrt(totalNumberOfUniqueTerms))*100);
      $scope.IsResultShown=true;

      }
  }
};
