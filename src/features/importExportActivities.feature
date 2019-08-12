@import_export_activities_SDB-124
Feature: As Jamie I need to declare my import and export activities so that Ric knows I am a priority inspection and I can receive necessary help in time.

    Import/Export Activities section validation

    @import_export_activities_happy_path_SDB-124
    Scenario: able to select one statement and proceed
        Given I open the url "/cleansession"
        And I change my viewport
        And I open the url "mid-and-east-antrim/business-import-export"
        When I click on the element "importExportActivities.directImport"
        And I click on the element "importExportActivities.button"
        Then I expect the url to not contain "business-import-export"

    @import_export_activities_no_selection_SDB-124
    Scenario: not selected any options and tries to continue
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-import-export"
        When I click on the element "importExportActivities.button"
        Then I expect the url to contain "business-import-export"
        And I expect that element "importExportActivities.error" contains the text "You must select valid option(s) before continuing"

    @import_export_activities_direct_import_forward_then_back_SDB-124
    Scenario: selects one option and then deselects it
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-import-export"
        When I click on the element "importExportActivities.directImport"
        And I click on the element "importExportActivities.button"
        Then I expect the url to not contain "business-import-export"
        When I click on the element "commonElements.backButton"
        Then I expect that checkbox "importExportActivities.directImport" is checked
        And I expect that checkbox "importExportActivities.directExport" is not checked
        And I expect that checkbox "importExportActivities.none" is not checked

    @import_export_activities_none_registration_summary_SDB-124
    Scenario: selects one option and then deselects it
        Given I open the url "/cleansession"
        And I open the url "mid-and-east-antrim/business-import-export"
        And I click on the element "importExportActivities.none"
        And I click on the element "importExportActivities.button"
        Then I expect the url to not contain "business-import-export"
        When I open the url "mid-and-east-antrim/registration-summary"
        Then I expect that element "registrationSummary.foodActivities" contains the text "None"





