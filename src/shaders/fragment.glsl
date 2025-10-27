uniform float uTime;
uniform sampler2D uNoiseTexture;
uniform vec2 uResolution;
uniform sampler2D uOniHelmetTexture;
uniform sampler2D uOniPersonTexture;
uniform sampler2D uOniMaskTexture;
uniform sampler2D uDepthTexture;
uniform vec2 uMouse;
uniform float uProgress;

in vec2 vUv;
in vec3 worldPosition;
in vec3 worldNormal;
in vec3 viewDirection;
in vec3 normals;

#include "./lib/uv/uvAspect.glsl"
#include "./lib/uv/uvFauxDepth.glsl"

void main()
{

    vec2 uv = vUv;
    vec2 uvWorld = worldPosition.xy;
    // uvWorld *= 0.5 + 0.5;
    float time = uTime;

    vec2 uvAspected = uvAspect( uv, uResolution );
    vec2 uvFakeDepth = uvFauxDepth( uv, uMouse, uDepthTexture, vec2( 0.3 ), vec2( 0.5, 0.3 ) );

    float noise = texture( uNoiseTexture, uv ).r;

    noise = step( uProgress, noise );

    vec4 albedo = texture( uOniPersonTexture, uvFakeDepth );
    vec4 helmet = texture( uOniHelmetTexture, uvFakeDepth );
    
    float mask = texture( uOniMaskTexture, uv ).r;

    vec4 colorFinal = mix( albedo, helmet, helmet.a * noise );

    gl_FragColor = colorFinal;
    
    #include <colorspace_fragment>
    
}