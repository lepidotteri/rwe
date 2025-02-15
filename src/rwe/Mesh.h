#pragma once


#include <array>
#include <rwe/ColorPalette.h>
#include <rwe/TextureHandle.h>
#include <rwe/math/Vector2f.h>
#include <rwe/math/Vector3f.h>

namespace rwe
{
    struct Mesh
    {
        struct Vertex
        {
            Vector3f position;
            Vector2f textureCoord;

            Vertex() = default;
            Vertex(const Vector3f& position, const Vector2f& textureCoord);
        };

        struct Triangle
        {
            Vertex a;
            Vertex b;
            Vertex c;

            Color color;

            Triangle() = default;
            Triangle(const Vertex& a, const Vertex& b, const Vertex& c);

            Triangle(const Vertex& a, const Vertex& b, const Vertex& c, const Color& color);
        };

        SharedTextureHandle texture;

        std::vector<Triangle> faces;
        std::vector<Triangle> colorFaces;
    };
}
