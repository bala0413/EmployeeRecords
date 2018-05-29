var app = angular.module("Employee", ["ngTagsInput", 'ui.select', 'datatables', 'angularUtils.directives.dirPagination']);

app.controller("EmployeeController", function ($scope, $http, $location, $timeout, $rootScope, $window, FileUploadService) {


    //loadAllPositionRecords();
    //function loadAllPositionRecords() {
    //    var promiseGetPosition = PositionService.getPosition();
    //    promiseGetPosition.then(function (response) {
    //        alert('Position Page');
    //        $scope.PositionTables = response.data
    //        console.log($scope.PositionTables);
    //    },
    //        function (errorPl) {
    //            $scope.error = errorPl;
    //        });
    //}



    $scope.PositionTabless = ['Developer', 'Team Leader', 'Project Manager', 'Manager', 'CEO'];
    $scope.multiple = {};
    //var uploadFiles = function () {
    //    var directive = {
    //        link: function (scope, element, attrs) {
    //            var changedHandler = function () {
    //                scope.$apply(function () {
    //                    if (element[0].files) {
    //                        scope.files.length = 0;
    //                        angular.forEach(element[0].files, function (f) {
    //                            scope.files.push(f);
    //                        });
    //                        scope.hasFiles = true;
    //                    }
    //                });
    //            };

    //            var resetHandler = function () {
    //                scope.$apply(function () {
    //                    scope.files.length = 0;
    //                    scope.hasFiles = false;
    //                });
    //            };

    //            element.bind('change', changedHandler);

    //            if (element[0].form) {
    //                angular.element(element[0].form).bind('reset', resetHandler);
    //            }

    //            // Watch the files so we can reset the input if needed
    //            scope.$watchCollection('files', function () {
    //                if (scope.files.length === 0) {
    //                    element.val(null);
    //                }
    //            })

    //            scope.$on('$destroy', function () {
    //                element.unbind('change', changedHandler);
    //                if (element[0].form) {
    //                    angular.element(element[0].form).unbind('reset', resetHandler);
    //                }
    //            });
    //        },
    //        restrict: 'A',
    //        scope: {
    //            files: '=uploadFiles',
    //            hasFiles: '='
    //        }
    //    };

    //    return directive;
    //};

    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        $scope.e = {};
        $scope.e.Firstname = $scope.Fname;
        $scope.e.Middlename = $scope.Mname;
        $scope.e.Lastname = $scope.Lname;
        $scope.e.DOB = $scope.Dobirth;
        $scope.e.DOJ = $scope.DoJoin;
        $scope.e.ProfilePicture = $scope.Pp;
        $scope.e.Position = $scope.multiple.Pos.toString();
        $http({
            method: "post",
            url: "/EmployeeForm/InsertEmployee",
            datatype: "json",
            data: JSON.stringify($scope.e)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
            $scope.Fname = "";
            $scope.Mname = "";
            $scope.Lname = "";
            $scope.Dobirth = "";
            $scope.DoJoin = "";
            $scope.Pp = "";
            $scope.multiple.Pos.toString() = "";
        })
    }

    $scope.GetAllData = function () {
        $http({
            method: "get",
            url: "/EmployeeForm/GetAllEmployees"
        }).then(function (response) {
            $scope.employees = response.data;
        }, function () {
            alert("Error Occur");
        });
    };

    $scope.UpdateData = function (e) {
        document.getElementById("EmpId_").value = e.EmpId;
        $scope.id = e.EmpId;
        $scope.Fname = e.Firstname;
        $scope.Mname = e.Middlename;
        $scope.Lname = e.Lastname;
        $scope.Dobirth = e.DOB;
        $scope.DoJoin = e.DOJ;
        $scope.Pos = e.Position;
        $http({
            method: "post",
            url: "/EmployeeForm/UpdatEmployee",
            datatype: "json",
            data: JSON.stringify($scope.e)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
            $scope.Fname = "";
            $scope.Mname = "";
            $scope.Lname = "";
            $scope.Dobirth = "";
            $scope.DoJoin = "";
            $scope.Pos = "";
            document.getElementById("btnSave").setAttribute("value", "Update");
        })
    }

    //$scope.UpdateDetails = function () {
    //    var e = {            
    //        EmpId : $scope.id,
    //        Firstname : $scope.Fname,
    //        Middlename : $scope.Mname,
    //        Lastname : $scope.Lname,
    //        DOB : $scope.Dobirth,
    //        DOJ : $scope.DoJoin,
    //       // ProfilePicture = $scope.uploadme,
    //        Position = $scope.Pos
    //    }
    //    $http({
    //        method: "post",
    //        url: "/EmployeeForm/UpdatEmployee",
    //        datatype: "json",
    //        data: JSON.stringify(e)
    //    }).then(function (response) {
    //        alert(response.data);
    //        $scope.GetAllData();
    //        document.getElementById("btnSave").setAttribute("value", "Update");
    //    })
    //}

    //$scope.UpdateData = function (e) {
    //    document.getElementById("EmpId_").value = e.EmpId;
    //    $scope.id = e.EmpId;
    //    $scope.Fname = e.Firstname;
    //    $scope.Mname = e.Middlename;
    //    $scope.Lname = e.Lastname;
    //    $scope.Dobirth = e.DOB;
    //    $scope.DoJoin = e.DOJ;
    //    $scope.Pos = e.Position;
    //};


    $scope.DeleteData = function (e) {
        $http({
            method: "post",
            url: "/EmployeeForm/DeleteEmployee",
            datatype: "json",
            data: JSON.stringify(e)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };



    //function EmployeeController(FileUploader) {
    //    var uploader = $scope.uploader = new FileUploader({
    //        url: 'server call'
    //    });
    //    uploader.filters.push({
    //        name: 'customFilter',
    //        fn: function (item, options) {
    //            return this.queue.length < 10;
    //        }
    //    });
    //    uploader.onWhenAddingFileFailed = function (item, filter, options) {
    //        console.info('onWhenAddingFileFailed', item, filter, options);
    //    };
    //    uploader.onAfterAddingFile = function (fileItem) {
    //        console.info('onAfterAddingFile', fileItem);
    //    };
    //    uploader.onAfterAddingAll = function (addedFileItems) {
    //        console.info('onAfterAddingAll', addedFileItems);
    //    };
    //    uploader.onBeforeUploadItem = function (item) {
    //        console.info('onBeforeUploadItem', item);
    //    };
    //    uploader.onProgressItem = function (fileItem, progress) {
    //        console.info('onProgressItem', fileItem, progress);
    //    };
    //    uploader.onProgressAll = function (progress) {
    //        console.info('onProgressAll', progress);
    //    };
    //    uploader.onSuccessItem = function (fileItem, response, status, headers) {
    //        console.info('onSuccessItem', fileItem, response, status, headers);
    //    };
    //    uploader.onErrorItem = function (fileItem, response, status, headers) {
    //        console.info('onErrorItem', fileItem, response, status, headers);
    //    };
    //    uploader.onCancelItem = function (fileItem, response, status, headers) {
    //        console.info('onCancelItem', fileItem, response, status, headers);
    //    };
    //    uploader.onCompleteItem = function (fileItem, response, status, headers) {
    //        console.info('onCompleteItem', fileItem, response, status, headers);
    //    };
    //    uploader.onCompleteAll = function () {
    //        console.info('onCompleteAll');
    //    };

    //    console.info('uploader', uploader);
    //};
});

app.controller("EmployeePicController", function ($scope, $http, $rootScope, $window, FileUploadService) {

    //$http.get('/api/EmployeeFormAPI/').success(function (data) {
    //    $scope.Images = data;
    //    if ($scope.Images.length > 0) {
    //        $scope.onShowImage($scope.Images[0].ProfilePicture);
    //    }
    //})
    //    .error(function () {
    //        $scope.error = "An Error has occured while loading posts!";

    //    });

    //$scope.onShowImage_new = function (ProfilePicture) {
    //    $scope.ShowImage = false;
    //    alert($scope.Images[$scope.icountval].ProfilePicture);
    //    $scope.Images[$scope.icountval].ProfilePicture.visible = true;
    //    $scope.AnimationImageName = $scope.Images[$scope.icountval].ProfilePicture.visible;
    //    $scope.icountval = $scope.icountval + 1;
    //    $timeout(function () {
    //        $scope.ShowImage = true;
    //    }, 2000);

    //}

    //$scope.onShowImage = function (ProfilePicture) {
    //    $scope.ShowImage = false;
    //    $scope.AnimationImageName = ProfilePicture

    //    $timeout(function () {
    //        $scope.ShowImage = true;
    //    }, 400);
    //}

    //$scope.Message = "";
    //$scope.FileInvalidMessage = "";
    //$scope.SelectedFileForUpload = null;
    //$scope.FileDescription_TR = "";
    //$scope.IsFormSubmitted = false;
    //$scope.IsFileValid = false;
    //$scope.IsFormValid = false;

    ////Form Validation
    //$scope.$watch("f1.$valid", function (isValid) {
    //    $scope.IsFormValid = isValid;
    //});

    $scope.ChechFileValid = function (file) {
        var isValid = false;
        if ($scope.SelectedFileForUpload != null) {

            if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') && file.size <= (1600 * 1200)) {
                $scope.FileInvalidMessage = "";
                isValid = true;
            }
            else {
                $scope.FileInvalidMessage = "Only JPEG/PNG/Gif Image can be upload )";
            }
        }
        else {
            $scope.FileInvalidMessage = "Image required!";
        }
        $scope.IsFileValid = isValid;

    };

    $scope.selectFileforUpload = function (file) {

        var files = file[0];
        $scope.Imagename = files.name;

        $scope.SelectedFileForUpload = file[0];


    }

    $scope.SaveFile = function () {
        $scope.IsFormSubmitted = true;

        $scope.Message = "";

        $scope.ChechFileValid($scope.SelectedFileForUpload);

        if ($scope.IsFormValid && $scope.IsFileValid) {

            FileUploadService.UploadFile($scope.SelectedFileForUpload).then(function (d) {
                var ItmDetails = {
                    ProfilePicture: $scope.Imagename
                };
                $http.post('/api/EmployeeFormAPI/', ItmDetails).success(function (data) {
                    alert("Added Successfully!!");
                    $scope.addMode = false;
                    $scope.Images.push(data);
                    $scope.loading = false;
                }).error(function (data) {
                    $scope.error = "An Error has occured while Adding Employee! " + data;
                    $scope.loading = false;
                });
                alert(d.Message + " Item Saved!");
                $scope.IsFormSubmitted = false;
            }, function (e) {
                alert(e);
            });
        }
        else {
            $scope.Message = "All the fields are required.";
        }

    };
});

    app.factory('FileUploadService', function ($http, $q) {

        var fac = {};
        fac.UploadFile = function (file) {
            var formData = new FormData();
            formData.append("file", file);

            var defer = $q.defer();
            $http.post("/EmployeeForm/UploadFile", formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                })
                .success(function (d) {
                    defer.resolve(d);
                })
                .error(function () {
                    defer.reject("File Upload Failed!");
                });

            return defer.promise;

        }
        return fac;

        //---------------------------------------------
        //End of Image Upload and Insert record

        // This Method IS TO save image name


    });

//app.directive('filestyle', filestyle);
//    function filestyle() {

//        controller.$inject = ['$scope', '$element'];
//        return {
//            restrict: 'A',
//            controller: controller
//        };

//        function controller($scope, $element) {
//            var options = $element.data();
//            options.classInput = $element.data('classinput') || options.classInput;

//            $element.filestyle(options);
//        }
//    };


 //$scope.uploadme;
    //$scope.uploadImage = function () {
    //    var fd = new FormData();
    //    var imgBlob = dataURItoBlob($scope.uploadme);
    //    fd.append('file', imgBlob);
    //    $http.post(
    //        'imageURL',
    //        fd, {
    //            transformRequest: angular.identity,
    //            headers: {
    //                'Content-Type': application / JSON
    //            }
    //        }
    //    )
    //        .success(function (response) {
    //            alert('success', response);
    //        })
    //        .error(function (response) {
    //            alert('error', response);
    //        });
    //}

    //function dataURItoBlob(dataURI) {
    //    var binary = atob(dataURI.split(',')[1]);
    //    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //    var array = [];
    //    for (var i = 0; i < binary.length; i++) {
    //        array.push(binary.charCodeAt(i));
    //    }
    //    return new Blob([new Uint8Array(array)], {
    //        type: mimeString
    //    });
    //}


    //$scope.Eprofile = "";

    //    $scope.$on("fileProgress", function (e, progress) {
    //        $scope.progress = progress.loaded / progress.total;
    //    });

//app.directive("fileread", [
//    function () {
//        return {
//            scope: {
//                fileread: "="
//            },
//            link: function (scope, element, attributes) {
//                element.bind("change", function (changeEvent) {
//                    var reader = new FileReader();
//                    reader.onload = function (loadEvent) {
//                        scope.$apply(function () {
//                            scope.fileread = loadEvent.target.result;
//                        });
//                    }
//                    reader.readAsDataURL(changeEvent.target.files[0]);
//                });
//            }
//        }
//    }
//]);
//app.directive("ngFileSelect", function (fileReader, $timeout) {
//    return {
//        scope: {
//            ngModel: '='
//        },
//        link: function ($scope, el) {
//            function getFile(file) {
//                fileReader.readAsDataUrl(file, $scope)
//                    .then(function (result) {
//                        $timeout(function () {
//                            $scope.ngModel = result;
//                        });
//                    });
//            }

//            el.bind("change", function (e) {
//                var file = (e.srcElement || e.target).files[0];
//                getFile(file);
//            });
//        }
//    };
//});

//app.factory("fileReader", function ($q, $log) {
//    var onLoad = function (reader, deferred, scope) {
//        return function () {
//            scope.$apply(function () {
//                deferred.resolve(reader.result);
//            });
//        };
//    };

//    var onError = function (reader, deferred, scope) {
//        return function () {
//            scope.$apply(function () {
//                deferred.reject(reader.result);
//            });
//        };
//    };

//    var onProgress = function (reader, scope) {
//        return function (event) {
//            scope.$broadcast("fileProgress", {
//                total: event.total,
//                loaded: event.loaded
//            });
//        };
//    };

//    var getReader = function (deferred, scope) {
//        var reader = new FileReader();
//        reader.onload = onLoad(reader, deferred, scope);
//        reader.onerror = onError(reader, deferred, scope);
//        reader.onprogress = onProgress(reader, scope);
//        return reader;
//    };

//    var readAsDataURL = function (file, scope) {
//        var deferred = $q.defer();

//        var reader = getReader(deferred, scope);
//        reader.readAsDataURL(file);
//        return deferred.promise;
//    };

//    return {
//        readAsDataUrl: readAsDataURL      
//    };
//});