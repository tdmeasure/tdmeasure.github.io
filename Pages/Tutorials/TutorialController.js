var tutorialController=function($scope)
{
  $scope.classes=
  [
    {
      Name:"Token",
      memberData:
      [
        {
          name:"value",
          type:"string",
          function:"token text value"
        },
        {
          name:"weight",
          type:"decimal",
          function:"token weight in its parent document vector in term document matrix "
        },
        {
          name:"stem",
          type:"string",
          function:"token stem value"
        },
        {
          name:"documentFreq",
          type:"object (eg:{value:2})",
          function:"token document frequency and we can get it with the value property",
          example:"var documentFrequency=token.documentFreq.value"
        }
      ]
    }
    ,
    {
      Name:"Document",
      memberData:
      [
        {
          name:"value",
          type:"string",
          link:"",
          function:"sentence text value"
        },
        {
          name:"terms",
          type:"dictionary",
          link:"Token",
          function:"sentence term dictionary with key (term stem value) and value (instance of token class)"
        },
        {
          name:"length",
          type:"integer",
          link:"",
          function:"number of normlized terms"
        },
        {
          name:"isEndedProperly",
          type:"boolean",
          function:"Indicate whether passed current document is a complete independent statment  or not"
        }

      ],
      memberfunctions:
      [
        {
            name:"getTermByIndex(index)",
            parameters:[{type:'integer',value:'index'}],
            returnType:{link:"Token",type:"Token"},
            function:"get token instance by index"
        }
      ]

    },
    {
      Name:"DisJointSet",
      memberfunctions:
      [
          {
            name:"find(index)",
            parameters:[{type:'integer',value:'index'}],
            returnType:{link:"",type:"integer"},
            function:"return parent set index for passed document index"
          },
          {
            name:"merge(sourceIndex,destIndex)",
            parameters:[{type:'integer',value:'sourceIndex'},{type:'integer',value:'destIndex'}],
            returnType:{link:"",type:"integer"},
            function:"merge two documents sets and return new parent index"
          },
          {
            name:"AssignSetHeader(parentSetIndex,documentIndex,totalDistance)",
            parameters:[{type:'integer',value:'parentSetIndex'},{type:'integer',value:'documentIndex'},{type:'integer',value:'totalDistance'}],
            returnType:{link:"Token",type:"Token"},
            function:"Make passed documentIndex as set header for passed set index if passed total distance sum for the document  is the heighest among other documents in the same set"
          },
          {
            name:"getSetHeader(setIndex)",
            parameters:[{type:'integer',value:'setIndex'}],
            returnType:{link:"",type:"integer"},
            function:"return index of first document in the passed set"
          }
      ]
    },
    {
      Name:"TDMATRIX",
      memberfunctions:
      [
        {
          name:"ExtractSentences(quote)",
          parameters:[{type:'string',value:'quote'}],
          returnType:{link:"Document",type:"Document[]"},
          function:"return array of documents classes for passed quote"
        },
        {
          name:"ExtractDocuments(quotes[])",
          parameters:[{type:'string[]',value:'quotes'}],
          returnType:{link:"Document",type:"Document[]"},
          function:"return array of documents classes for passed quote"
        },
        {
          name:"ExtractNormlizedToken(quote,document,docFrequencies)",
          parameters:[{type:'string',value:'quote'},{type:'Document',value:'document'},{type:'Dictionary',value:'docFrequencies'}],
          returnType:{type:"Boolean"},
          function:"Extract normlized token from passed quote and append it to documents terms and also update document frequencies for tokens. Return true is passed document terms were updated"
        },
        {
          name:"GetDistance(sourceDoc,destDoc)",
          parameters:[{type:'Document',value:'sourceDoc'},{type:'Document',value:'destDoc'}],
          returnType:{type:"integer"},
          function:"return ecludian distance between passed source and dest documents"
        },
        {
          name:"ExtractDisjointSet(documents,minthrshold)",
          parameters:[{href:"Document",type:'Document[]',value:'quotes'},{type:'int',value:'minthrshold'}],
          returnType:{link:"DisjointSet",type:"DisjointSet"},
          function:"return disjoint set for passed documents and docments with distance less than minthrshold are in the same set "
        },
        {
          name:"ApplyTfIDf(documents,minTermWeight)",
          parameters:[{href:"Document",type:'Document[]',value:'documents'},{type:'int',value:'minTermWeight'}],
          returnType:{type:"Boolean"},
          function:"Apply tdidf on passed documents and return true in documents matrix are updated and remove terms less than passed minTermWeight"
        },
        {
          name:"NormlizeTermsFrequency(documents,minTermWeight)",
          parameters:[{href:"Document",type:'Document[]',value:'documents'},{type:'int',value:'minTermWeight'}],
          returnType:{type:"Boolean"},
          function:"Nomlize term frequencies for passed documents array  and remove terms less than passed minTermWeight"
        }

      ]
    }
  ];
};
