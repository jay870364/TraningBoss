${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;
    
    // Uncomment the constructor to change template settings.
    //Template(Settings settings)
    //{
    //    settings.IncludeProject("Project.Name");
    //    settings.OutputExtension = ".tsx";
    //}

    // Custom extension methods can be used in the template by adding a $ prefix e.g. $LoudName
    string LoudName(Property property)
    {
        return property.Name.ToUpperInvariant();
    }
	string RenderDecorator(Attribute attribute){
		switch(attribute.FullName){
            case "System.ComponentModel.DataAnnotations.KeyAttribute":return "@Key()";
            default:return $"// {attribute.Name}({attribute.Value})";
        }
	}
}
 $Classes(Bossinfo.Models.Hospital.*)[//改NameSpace就好
 
    import { BossApiModel, Key } from '@boss/decorator/BossApiModel';
    import { I18nNamespace } from '@boss/decorator/i18n/i18nNs';
    @BossApiModel('api/$Name')
    @I18nNamespace('Model.EDI.$Name')
    export class $Name {
        $Properties[
        $Attributes[$RenderDecorator]
        public $Name: $Type;]
    }
    
    /*
    "$Name": {
        $Properties[
        "$Name": "$Name"][,]
    }
    */
    ]
$Enums(Bossinfo.Models.Platform.*)[
/*
	export enum $Name{
		$Values[
			$Name = $Value][,]
	}
    */
]